// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const { pathname } = req.nextUrl;
		const token = req.nextauth.token;

		const isAuthUrl = [
			"/signin",
			"/signup",
			"/verify",
			"/forgot-password",
		].some((path) => pathname.startsWith(path));

		const isProtectedUrl = [
			"/orders",
			"/carts",
			"/profile",
		].some((path) => pathname.startsWith(path));

		const isDashboardUrl =
			pathname.startsWith("/dashboard");

		// If token exists and trying to access auth page
		if (token && isAuthUrl) {
			return NextResponse.redirect(new URL("/", req.url));
		}

		// Admin-only dashboard
		if (
			isDashboardUrl &&
			!(
				token?.role === "admin" ||
				token?.role === "superAdmin"
			)
		) {
			return NextResponse.redirect(
				new URL("/signin", req.url),
			);
		}

		// General protected routes
		if (!token && isProtectedUrl) {
			return NextResponse.redirect(
				new URL("/signin", req.url),
			);
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: () => true, // Allow all routes through initially
		},
	},
);

export const config = {
	matcher: [
		"/signin",
		"/signup",
		"/verify",
		"/forgot-password",
		"/dashboard/:path*",
		"/orders/:path*",
		"/carts/:path*",
		"/profile/:path*",
	],
};
