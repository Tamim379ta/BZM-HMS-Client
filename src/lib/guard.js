import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export const ROLE_HOME = {
  superadmin: '/admin',
  receptionist: '/reception',
  doctor: '/doctor',
  lab: '/lab',
}

export async function requireRole(...roles) {
  const session = await getSession()
  if (!session) redirect('/login')

  const role = session.user.role
  if (!roles.includes(role)) redirect(ROLE_HOME[role] ?? '/login')

  return session
}