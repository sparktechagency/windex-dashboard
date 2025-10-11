import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

const subAdminRoutes = [
  "/admin/wishlist",
  "/admin/refund-request",
  "/admin/token-order",
  "/admin/profile-report",
  "/admin/wishlist-report",
  "/admin/feed-report",
  "/admin/reel-report",
  "/admin/profile",
];

export function middleware(req) {
  const { nextUrl } = req;

  // Get the accessToken value
  const isLoggedIn = req.cookies.get("windex-access-token")?.value;
  const isAuthRoute =
    nextUrl.pathname === "/login" || nextUrl.pathname === "/sign-up";
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const decoded = jwtDecode(isLoggedIn);
  if (
    decoded?.role === "sub_admin" &&
    !subAdminRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/admin/wishlist", req.url));
  }
  const isSellerPathWithObjectId = /^\/seller\/[a-f\d]{24}$/i.test(
    nextUrl.pathname,
  );

  // Allow requests to `/seller/mongodb_objectId`
  if (isSellerPathWithObjectId) {
    return NextResponse.next();
  }

  // If user exists, redirect to `/` from `login`
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user not found, redirect to `/login` from protected routes
  // no redirect happen if already in `/login`
}

export const config = {
  matcher: ["/admin/:path*"],
};
