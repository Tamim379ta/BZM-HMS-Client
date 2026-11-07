import { requireRole } from '@/lib/guard'
import LogoutButton from '@/components/LogoutButton'

export default async function ReceptionLayout({ children }) {
  const { user } = await requireRole('receptionist')

  return (
    <div>
      <header>
        <span>{user.name} · Reception</span>
        <LogoutButton />
      </header>
      {children}
    </div>
  )
}