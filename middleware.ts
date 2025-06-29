import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Check if city cookie exists
  const citySlug = request.cookies.get('city')?.value;
  
  // If no city cookie and user is on homepage, we'll handle this in the component
  // The middleware just ensures the cookie is available for SSR
  if (citySlug) {
    response.headers.set('x-city-slug', citySlug);
  }
  
  return response;
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};