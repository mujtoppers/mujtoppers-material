import { NextResponse } from "next/server";

// NOTE: This middleware only runs in server mode (SSR/Edge).
// With `output: 'export'` in next.config.mjs, this file is IGNORED.
// For static sites, use Cloudflare or Vercel Firewall instead.

// --- Configuration ---
const BLOCKED_COUNTRIES = ["HK"];

const BLOCKED_IPS = [
	"115.245.68.163",
	"115.248.83.146",
	"115.248.83.147",
];

// Suspicious User-Agent patterns (common bots/scrapers)
const SUSPICIOUS_UA_PATTERNS = [
	/python-requests/i,
	/urllib/i,
	/scrapy/i,
	/curl/i,
	/wget/i,
	/httpx/i,
	/aiohttp/i,
	/go-http-client/i,
	/java\//i,
	/perl/i,
	/libwww/i,
	/mechanize/i,
	/phantom/i,
	/headless/i,
	/selenium/i,
	/puppeteer/i,
	/playwright/i,
];

// Rate limit: max requests per window per fingerprint
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 60; // max 60 requests per minute per fingerprint
const HARD_BLOCK_THRESHOLD = 200; // auto-block if > 200 req/min

// --- In-memory rate limiter (works in Edge runtime, resets on cold start) ---
// For persistent rate limiting, use Vercel KV, Upstash Redis, or Cloudflare KV.
const requestLog = new Map();

function cleanupOldEntries() {
	const now = Date.now();
	for (const [key, entry] of requestLog) {
		if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
			requestLog.delete(key);
		}
	}
}

function checkRateLimit(fingerprint) {
	const now = Date.now();

	// Periodic cleanup (every ~100 checks)
	if (Math.random() < 0.01) cleanupOldEntries();

	const entry = requestLog.get(fingerprint);
	if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
		requestLog.set(fingerprint, { windowStart: now, count: 1 });
		return { blocked: false, count: 1 };
	}

	entry.count++;
	return { blocked: entry.count > RATE_LIMIT_MAX, count: entry.count };
}

// --- Fingerprinting: Combine multiple signals beyond just IP ---
function getRequestFingerprint(request, ip) {
	const ua = request.headers.get("user-agent") ?? "none";
	const acceptLang = request.headers.get("accept-language") ?? "none";
	const acceptEnc = request.headers.get("accept-encoding") ?? "none";
	const secFetchMode = request.headers.get("sec-fetch-mode") ?? "none";
	const secChUa = request.headers.get("sec-ch-ua") ?? "none";

	// Combine into a fingerprint string
	// Even with rotating IPs, these headers stay consistent for the same client
	const raw = `${ua}|${acceptLang}|${acceptEnc}|${secFetchMode}|${secChUa}`;

	// Simple hash (FNV-1a)
	let hash = 2166136261;
	for (let i = 0; i < raw.length; i++) {
		hash ^= raw.charCodeAt(i);
		hash = (hash * 16777619) >>> 0;
	}

	return `fp_${hash.toString(36)}`;
}

// --- Bot detection heuristics ---
function isSuspiciousRequest(request) {
	const ua = request.headers.get("user-agent");
	const accept = request.headers.get("accept");
	const secFetchSite = request.headers.get("sec-fetch-site");
	const secFetchMode = request.headers.get("sec-fetch-mode");

	// No User-Agent at all → almost certainly a bot
	if (!ua || ua.length < 10) return "missing-ua";

	// Known bot/scraper User-Agents
	for (const pattern of SUSPICIOUS_UA_PATTERNS) {
		if (pattern.test(ua)) return "bot-ua";
	}

	// Missing Accept header (real browsers always send this)
	if (!accept) return "missing-accept";

	// Missing Sec-Fetch-* headers (modern browsers always send these)
	// Only check for navigation requests, not API calls
	if (!secFetchSite && !secFetchMode && ua.includes("Mozilla")) {
		return "missing-sec-fetch";
	}

	return null;
}

export function middleware(request) {
	const country = request.geo?.country ?? "";
	const ip =
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
		request.ip ??
		"";

	// 1. Block known bad IPs
	if (BLOCKED_IPS.includes(ip)) {
		return new NextResponse("Access Denied", { status: 403 });
	}

	// 2. Block known bad countries
	if (BLOCKED_COUNTRIES.includes(country)) {
		return new NextResponse("Access Denied", { status: 403 });
	}

	// 3. Bot detection — block obviously non-browser requests
	const suspiciousReason = isSuspiciousRequest(request);
	if (suspiciousReason === "bot-ua" || suspiciousReason === "missing-ua") {
		return new NextResponse("Access Denied", { status: 403 });
	}

	// 4. Fingerprint-based rate limiting (catches rotating IPs)
	const fingerprint = getRequestFingerprint(request, ip);
	const rateResult = checkRateLimit(fingerprint);

	if (rateResult.count > HARD_BLOCK_THRESHOLD) {
		// Extreme abuse — hard block
		return new NextResponse("Access Denied", { status: 403 });
	}

	if (rateResult.blocked) {
		// Rate limited — tell them to slow down
		return new NextResponse("Too Many Requests", {
			status: 429,
			headers: {
				"Retry-After": "60",
			},
		});
	}

	// 5. Add fingerprint header for logging/debugging (optional)
	const response = NextResponse.next();
	response.headers.set("X-Request-Fingerprint", fingerprint);

	// If suspicious but not blocked, add a warning header for monitoring
	if (suspiciousReason) {
		response.headers.set("X-Suspicious", suspiciousReason);
	}

	return response;
}

// Apply middleware to all routes
export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
