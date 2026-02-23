import { NextResponse } from "next/server";

// Add country codes here to block additional regions
// Reference: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
const BLOCKED_COUNTRIES = ["HK"];

export function middleware(request) {
	const country = request.geo?.country ?? "";

	if (BLOCKED_COUNTRIES.includes(country)) {
		return new NextResponse("Access Denied", { status: 403 });
	}

	return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
