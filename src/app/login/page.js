import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { ROLE_HOME } from '@/lib/guard'
import LoginForm from '@/components/LoginForm'

export default async function LoginPage() {
  const session = await getSession()
  const home = session && ROLE_HOME[session.user.role]
  if (home) redirect(home)

  return <LoginForm />
}