'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { request } from '@/lib/request'

const ROLE_LABEL = {
  receptionist: 'Receptionist',
  doctor: 'Doctor',
  lab: 'Lab staff',
}

export default function StaffRow({ user }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [resetting, setResetting] = useState(false)
  const [password, setPassword] = useState('')

  async function run(action) {
    setError('')
    setBusy(true)
    try {
      await action()
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const base = `/api/admin/staff/${user.id}`

  const toggleBlock = () =>
    run(() => request(`${base}/${user.banned ? 'unban' : 'ban'}`, 'PATCH'))

  const remove = () => {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return
    run(() => request(base, 'DELETE'))
  }

  const resetPassword = (e) => {
    e.preventDefault()
    run(async () => {
      await request(`${base}/password`, 'PATCH', { password })
      setPassword('')
      setResetting(false)
    })
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{ROLE_LABEL[user.role] ?? user.role}</td>
      <td>{user.banned ? 'Blocked' : 'Active'}</td>
      <td>
        <button onClick={toggleBlock} disabled={busy}>
          {user.banned ? 'Unblock' : 'Block'}
        </button>

        <button onClick={() => setResetting((v) => !v)} disabled={busy}>
          Reset password
        </button>

        <button onClick={remove} disabled={busy}>
          Delete
        </button>

        {resetting && (
          <form onSubmit={resetPassword}>
            <label htmlFor={`pw-${user.id}`}>New temporary password</label>
            <input
              id={`pw-${user.id}`}
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button type="submit" disabled={busy}>Save</button>
          </form>
        )}

        {error && <p role="alert">{error}</p>}
      </td>
    </tr>
  )
}