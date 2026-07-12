import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const loginURL = new URL('/auth?auth=login', request.url)

  const adminToken = request.cookies.get('nextauth.token')?.value

  const adminUserId = request.cookies.get('nextauth.userId')?.value

  const clientToken = request.cookies.get('nextauth.token.client')?.value

  const clientUserId = request.cookies.get('nextauth.userId.client')?.value

  const isDashboard = pathname.startsWith('/dashboard')

  const isClientDashboard = pathname.startsWith('/dashboard/client')

  if (isDashboard && !isClientDashboard) {
    const parts = pathname.split('/')

    const dashboardSections = ['products', 'settings', 'orders', 'users']

    const section = parts[2]

    const isInternalDashboardRoute = dashboardSections.includes(section)

    if (isInternalDashboardRoute) {
      if (!adminToken || !adminUserId) {
        return NextResponse.redirect(loginURL)
      }

      return NextResponse.next()
    }

    const routeId = parts[2]

    if (!adminToken || !adminUserId || adminUserId !== routeId) {
      return NextResponse.redirect(loginURL)
    }

    return NextResponse.next()
  }

  if (isClientDashboard) {
    const parts = pathname.split('/')

    const clientRouteId = parts[3]

    if (!clientToken || !clientUserId || clientUserId !== clientRouteId) {
      return NextResponse.redirect(loginURL)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
