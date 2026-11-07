'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await authClient.signOut()
    router.replace('/login')
    router.refresh()
  }

  return <button onClick={logout}>Log out</button>
}