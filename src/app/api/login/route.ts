import { NextResponse } from 'next/server'
import { USERNAME, PASSWORD, SESSION_SECRET } from '@/config/auth'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (username !== USERNAME || password !== PASSWORD) {
    return NextResponse.json({ error: 'Wrong username or password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('me_session', SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  return response
}
