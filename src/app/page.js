import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { ROLE_HOME } from '@/lib/guard'

export default async function Home() {
  const session = await getSession()
  redirect((session && ROLE_HOME[session.user.role]) || '/login')
}