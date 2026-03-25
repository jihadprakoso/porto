import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { createClient } from "@/utils/supabase/middleware";

// We must provide the secret here for Edge compatibility if not picked up from env
const { auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});

export default auth(async (req) => {
  try {
    const supabaseResponse = createClient(req);
    return supabaseResponse;
  } catch (e) {
    console.error("Middleware error:", e);
    return; // Fallback to normal flow
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
