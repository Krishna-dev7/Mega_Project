import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret });
	const url = req.nextUrl;
	const pathname = url.pathname;

	const isAuthUrl =
		pathname.startsWith("/signin") ||
		pathname.startsWith("/signup") ||
		pathname.startsWith("/verify") ||
		pathname.startsWith("/forgot-password");

	const isProtectedUrl =
		pathname.startsWith("/orders") ||
		pathname.startsWith("/carts") ||
		pathname.startsWith("/profile");

	const isDashboardUrl = pathname.startsWith("/dashboard");

	if (isDashboardUrl) {
		if (token?.role === "admin" || token?.role === "superAdmin") {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/signin", req.url));
		}
	}

	if (token && isAuthUrl) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (!token && isProtectedUrl) {
		return NextResponse.redirect(new URL("/signin", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/signin",
		"/signup",
		"/verify",
		"/forgot-password",
		"/dashboard/:path*",
		"/carts/:path*",
		"/orders/:path*",
		"/profile/:path*",
	],
};
