import { NextResponse } from 'next/server';

// This proxy runs on every request to protect routes
export function proxy(request) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that do not require authentication
  const isPublicPath = path === '/studentlogin' || path === '/teacherlogin' || path === '/' || path === '/dunki';
  
  // Check if user has a token in cookies
  const token = request.cookies.get('token')?.value || '';
  
  // If user tries to access a protected route without a token, redirect to home
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  
  // If already logged in and hits a login page, redirect to dashboard
  if (isPublicPath && token && (path === '/studentlogin' || path === '/teacherlogin')) {
    return NextResponse.redirect(new URL('/studentdashboard', request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/studentlogin',
    '/teacherlogin',
    '/studentdashboard',
    '/teacherdashboard',
    '/semester/:path*',
    '/dunki'
  ],
};
