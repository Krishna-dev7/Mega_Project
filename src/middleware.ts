import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req });
	const url = req.nextUrl;
	const isAuthUrl =
		url.pathname.startsWith("/signin") ||
		url.pathname.startsWith("/signup") ||
		url.pathname.startsWith("/verify") ||
		url.pathname.startsWith("/forgot-password");

	console.log(url);

	const isProtectedUrl =
		url.pathname.startsWith("/admin") ||
		url.pathname.startsWith("/orders") ||
		url.pathname.startsWith("/carts") ||
		url.pathname.startsWith("/profile");

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
		"/admin",
		"/carts",
		"/orders",
	],
};
