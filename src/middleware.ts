import { auth } from "@/lib/auth";
import { createClient } from "@/utils/supabase/middleware";

export default auth(async (req) => {
  // Sync Supabase session
  const supabaseResponse = createClient(req);
  
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard && !isLoggedIn) {
     return Response.redirect(new URL("/login", req.nextUrl));
  }

  return supabaseResponse;
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
