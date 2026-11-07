import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = await cookies()

  const res = await fetch(`${process.env.API_URL}/api/auth/get-session`, {
    headers: { cookie: cookieStore.toString() },
    cache: 'no-store',
  })

  if (!res.ok) return null

  const data = await res.json()
  return data?.user ? data : null
}