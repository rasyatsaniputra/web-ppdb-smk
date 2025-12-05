import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (pathname === "/dashboard") {
      if (token?.role === "student") {
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
      } else if (token?.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
