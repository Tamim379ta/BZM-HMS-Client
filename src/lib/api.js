import { cookies } from 'next/headers'

export async function apiFetch(path, options = {}) {
  const cookieStore = await cookies()

  return fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: { ...options.headers, cookie: cookieStore.toString() },
    cache: 'no-store',
  })
}