import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <main>
      <h1>Super Admin dashboard</h1>
      <nav>
        <Link href="/admin/staff">Staff accounts</Link>
      </nav>
    </main>
  )
}