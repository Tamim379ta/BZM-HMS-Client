'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { request } from '@/lib/request'

export default function CreateStaffForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      await request('/api/admin/staff', 'POST', data)
      form.reset()
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Create staff account</h2>

      <label htmlFor="name">Full name</label>
      <input id="name" name="name" required />

      <label htmlFor="username">Username</label>
      <input id="username" name="username" autoComplete="off" required />

      <label htmlFor="password">Temporary password</label>
      <input id="password" name="password" type="password" minLength={8} autoComplete="new-password" required />

      <label htmlFor="role">Role</label>
      <select id="role" name="role" defaultValue="receptionist">
        <option value="receptionist">Receptionist</option>
        <option value="lab">Lab staff</option>
      </select>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create account'}
      </button>
    </form>
  )
}