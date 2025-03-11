import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Danh sách các route cần xác thực
const protectedRoutes = ["/dashboard", "/profile", "/settings"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value
  const { pathname } = request.nextUrl

  // Kiểm tra nếu route cần xác thực và không có token
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    // Chuyển hướng đến trang đăng nhập
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // Nếu đã đăng nhập và truy cập trang đăng nhập/đăng ký, chuyển hướng đến dashboard
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

