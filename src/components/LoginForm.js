'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const { error } = await authClient.signIn.username({
      username: String(form.get('username')).trim(),
      password: String(form.get('password')),
    })

    if (error) {
      setError(error.message || 'Login failed')
      setLoading(false)
      return
    }

    router.replace('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Username</label>
      <input id="username" name="username" autoComplete="username" required />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}