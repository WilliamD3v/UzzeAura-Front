import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginURL = new URL("/auth?auth=login", request.url);

  const adminToken = request.cookies.get("nextauth.token")?.value;
  const adminUserId = request.cookies.get("nextauth.userId")?.value;

  const clientToken = request.cookies.get("nextauth.token.client")?.value;
  const clientUserId = request.cookies.get("nextauth.userId.client")?.value;

  const pathParts = pathname.split("/");

  const isDashboardRoute = pathname.startsWith("/dashboard/");
  const isClientRoute = pathname.startsWith("/dashboard/client/");

  const routeId = pathParts[2];

  // DASHBOARD /dashboard/:id*
  if (isDashboardRoute && !isClientRoute) {
    if (!adminToken || !adminUserId || adminUserId !== routeId) {
      return NextResponse.redirect(loginURL);
    }
    return NextResponse.next();
  }

  // CLIENT /dashboard/client/:id*
  if (isClientRoute) {
    const clientRouteId = pathParts[3];

    if (!clientToken || !clientUserId || clientUserId !== clientRouteId) {
      return NextResponse.redirect(loginURL);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [""],
};