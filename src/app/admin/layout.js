import { requireRole } from '@/lib/guard'
import LogoutButton from '@/components/LogoutButton'

export default async function AdminLayout({ children }) {
  const { user } = await requireRole('superadmin')

  return (
    <div>
      <header>
        <span>{user.name} · Super Admin</span>
        <LogoutButton />
      </header>
      {children}
    </div>
  )
}