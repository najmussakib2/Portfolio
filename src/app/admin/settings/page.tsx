'use client'

import useGetMe from '@/contexts/useGetMe'
import { Settings } from '@/types'
import { useState } from 'react'

export default function AdminSettings() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const {data: settings, setData: setSettings, isLoading: loading} = useGetMe()

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    const data = await res.json()
    if (data.success) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  if (loading) return <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="glass-card rounded-2xl h-16 animate-pulse" />)}</div>
  if (!settings) return null

  const field = (label: string, key: keyof Settings, type = 'text', placeholder = '') => (
    <div key={key}>
      <label className="block text-sm text-[var(--text-secondary)] mb-1.5">{label}</label>
      <input
        type={type}
        value={String(settings[key] ?? '')}
        onChange={e => setSettings(p => p ? { ...p, [key]: e.target.value } : p)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-all text-sm"
      />
    </div>
  )

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your portfolio content dynamically</p>
      </div>

      {/* Identity */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-[var(--text-primary)]">Identity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('Full Name', 'name', 'text', 'Najmus Sakib')}
          {field('Title / Role', 'title', 'text', 'Full Stack Developer')}
        </div>
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Bio</label>
          <textarea
            rows={3}
            value={settings.bio ?? ''}
            onChange={e => setSettings(p => p ? { ...p, bio: e.target.value } : p)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-all text-sm resize-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('Email', 'email', 'email')}
          {field('Location', 'location', 'text', 'Dhaka, Bangladesh')}
        </div>
      </div>

      {/* Availability */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-[var(--text-primary)]">Availability</h2>
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-[var(--border)]">
          <div>
            <div className="text-sm font-medium text-[var(--text-primary)]">Open to Work</div>
            <div className="text-xs text-[var(--text-secondary)] mt-0.5">Shows green badge on your portfolio</div>
          </div>
          <button
            onClick={() => setSettings(p => p ? { ...p, open_to_work: !p.open_to_work } : p)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${settings.open_to_work ? 'bg-gradient-to-r from-sky-500 to-cyan-500' : 'bg-white/20'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${settings.open_to_work ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
        {field('Availability Message', 'availability_message', 'text', 'Available for freelance & full-time')}
      </div>

      {/* Assets */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-[var(--text-primary)]">Assets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('Avatar URL', 'avatar_url', 'url', 'https://...')}
          {field('CV / Resume URL', 'cv_url', 'url', 'https://...')}
        </div>
      </div>

      {/* Social Links */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-[var(--text-primary)]">Social Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('GitHub URL', 'github_url', 'url')}
          {field('LinkedIn URL', 'linkedin_url', 'url')}
          {field('Twitter URL', 'twitter_url', 'url')}
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} className="btn-primary">
        {saving ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
        ) : saved ? '✅ Saved!' : 'Save Changes'}
      </button>
    </div>
  )
}
