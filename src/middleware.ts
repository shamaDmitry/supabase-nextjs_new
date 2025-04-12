import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/src/utils/supabase/middleware";
import { authRoutes, protectedRoutes } from "@/src/routerList";
import { createClient } from "@/src/utils/supabase/server";

export async function middleware(request: NextRequest) {
  // update user's auth session
  const response = await updateSession(request);

  const { pathname } = request.nextUrl;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/login", request.url);

    redirectUrl.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && user) {
    // Check if there's a redirectTo parameter in the URL
    const redirectTo = request.nextUrl.searchParams.get("redirectTo");

    // Redirect to the specified URL or to dashboard if none specified
    const redirectUrl = new URL(redirectTo || "/dashboard", request.url);

    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
