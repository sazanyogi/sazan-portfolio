import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_SECRET } from '@/config/auth'

export function proxy(request: NextRequest) {
  const session = request.cookies.get('me_session')?.value

  if (!session || session !== SESSION_SECRET) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/me', '/me/:path*'],
}
