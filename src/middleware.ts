import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// We must provide the secret here for Edge compatibility if not picked up from env
const { auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});

export default auth;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
