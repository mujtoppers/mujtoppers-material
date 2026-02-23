import { NextResponse } from "next/server";

// Add country codes here to block additional regions
// Reference: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
const BLOCKED_COUNTRIES = ["HK"];

// Block abusive IPs (high request volume bots/scrapers)
const BLOCKED_IPS = [
	"115.245.68.163",
	"115.248.83.146",
	"115.248.83.147",
];

export function middleware(request) {
	const country = request.geo?.country ?? "";
	const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
		?? request.ip
		?? "";

	if (BLOCKED_IPS.includes(ip)) {
		return new NextResponse("Access Denied", { status: 403 });
	}

	if (BLOCKED_COUNTRIES.includes(country)) {
		return new NextResponse("Access Denied", { status: 403 });
	}

	return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
