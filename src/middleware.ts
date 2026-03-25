import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { createClient } from "@/utils/supabase/middleware";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // Sync Supabase session
  const supabaseResponse = createClient(req);
  return supabaseResponse;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
