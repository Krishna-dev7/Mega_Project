import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";
export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req });
	console.log('token', token);
	const url = req.nextUrl;
	const isAuthUrl =
		url.pathname.startsWith("/signin") ||
		url.pathname.startsWith("/signup") ||
		url.pathname.startsWith("/verify") ||
		url.pathname.startsWith("/forgot-password");

	console.log(url);

	const isProtectedUrl =
		url.pathname.startsWith("/orders") ||
		url.pathname.startsWith("/carts") ||
		url.pathname.startsWith("/profile");

	const isDashboardUrl = url.pathname.startsWith("/dashboard");

	if (isDashboardUrl) {
		if (token?.role === "superAdmin" || token?.role === "admin") {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/signin", req.url));
		}
	}

	if (token && isAuthUrl) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (!token?.username && isProtectedUrl) {
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
		"/dashboard",
		"/carts",
		"/orders",
	],
};
