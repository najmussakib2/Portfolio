'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) router.push('/admin')
      else setError('Invalid email or password')
    } catch {
      setError('Login failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 "
        style={{ background: 'radial-gradient(ellipse at center, #0D1B2A 0%, #060B14 70%)' }}>
        <div className="w-full max-w-md glass-card rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="text-4xl font-extrabold gradient-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>NS</div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Email</label>
              <input
                type="email" required value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Password</label>
              <input
                type="password" required value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-all"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
