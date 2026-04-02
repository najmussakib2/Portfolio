'use client'

import { useState, useEffect } from 'react'

interface Summary {
  total_visits: number
  unique_visitors: number
  avg_duration_seconds: number
  cv_downloads: number
  top_pages: { page: string; visits: number }[]
  visits_by_day: { date: string; visits: number }[]
  visits_by_country: { country: string; visits: number }[]
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [range, setRange] = useState('30')
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(0)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`/api/analytics/summary?range=${range}`).then(r => r.json()),
      fetch('/api/contact?unread=true').then(r => r.json()),
    ]).then(([analytics, contact]) => {
      setSummary(analytics.data)
      setMessages(contact.data?.length ?? 0)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [range])

  const STATS = summary ? [
    { label: 'Total Visits', value: summary.total_visits.toLocaleString(), icon: '👁️', color: 'from-sky-500/20 to-cyan-500/20', border: 'border-sky-500/30' },
    { label: 'Unique Visitors', value: summary.unique_visitors.toLocaleString(), icon: '👤', color: 'from-cyan-500/20 to-teal-500/20', border: 'border-cyan-500/30' },
    { label: 'Avg. Time on Site', value: `${Math.floor(summary.avg_duration_seconds / 60)}m ${summary.avg_duration_seconds % 60}s`, icon: '⏱️', color: 'from-teal-500/20 to-emerald-500/20', border: 'border-teal-500/30' },
    { label: 'CV Downloads', value: summary.cv_downloads.toLocaleString(), icon: '📥', color: 'from-emerald-500/20 to-sky-500/20', border: 'border-emerald-500/30' },
    { label: 'Unread Messages', value: messages.toString(), icon: '📬', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30' },
  ] : []

  const maxVisits = summary?.visits_by_day.length
    ? Math.max(...summary.visits_by_day.map(d => d.visits))
    : 1

  return (
    <div className="space-y-8 max-w-6xl">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Your portfolio at a glance</p>
        </div>
        <div className="flex gap-2 glass-card rounded-xl p-1">
          {[['7', '7d'], ['30', '30d'], ['90', '90d']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setRange(val)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                range === val ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[1,2,3,4,5].map(i => <div key={i} className="glass-card rounded-2xl h-28 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {STATS.map(stat => (
            <div key={stat.label} className={`glass-card rounded-2xl p-5 bg-gradient-to-br ${stat.color} border ${stat.border}`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Visits chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="font-bold text-[var(--text-primary)] mb-5" style={{ fontFamily: 'var(--font-display)' }}>Daily Visits</h3>
          {loading ? (
            <div className="h-40 animate-pulse bg-white/5 rounded-xl" />
          ) : (
            <div className="flex items-end gap-1.5 h-40">
              {(summary?.visits_by_day ?? []).slice(-30).map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div
                    className="w-full rounded-t-sm bg-gradient-to-t from-sky-500/60 to-cyan-400/60 hover:from-sky-500 hover:to-cyan-400 transition-all cursor-pointer"
                    style={{ height: `${(d.visits / maxVisits) * 100}%`, minHeight: d.visits > 0 ? 4 : 0 }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass-card px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {d.visits} visits
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top pages */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-[var(--text-primary)] mb-5" style={{ fontFamily: 'var(--font-display)' }}>Top Pages</h3>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-8 animate-pulse bg-white/5 rounded" />)}</div>
          ) : (
            <div className="space-y-3">
              {(summary?.top_pages ?? []).slice(0, 6).map(page => {
                const max = summary?.top_pages[0]?.visits ?? 1
                return (
                  <div key={page.page}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--text-secondary)] truncate">{page.page || '/'}</span>
                      <span className="text-[var(--text-primary)] font-medium ml-2">{page.visits}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full transition-all duration-700"
                        style={{ width: `${(page.visits / max) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Countries */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-[var(--text-primary)] mb-5" style={{ fontFamily: 'var(--font-display)' }}>Top Countries</h3>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-8 animate-pulse bg-white/5 rounded" />)}</div>
          ) : (
            <div className="space-y-2">
              {(summary?.visits_by_country ?? []).slice(0, 6).map(c => (
                <div key={c.country} className="flex items-center justify-between text-sm py-1.5">
                  <span className="text-[var(--text-secondary)]">{c.country}</span>
                  <span className="tag-pill text-xs">{c.visits}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="font-bold text-[var(--text-primary)] mb-5" style={{ fontFamily: 'var(--font-display)' }}>Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'New Project', href: '/admin/projects', icon: '🚀' },
              { label: 'New Blog Post', href: '/admin/blog', icon: '✍️' },
              { label: 'Edit Settings', href: '/admin/settings', icon: '⚙️' },
              { label: 'View Messages', href: '/admin/messages', icon: '📬' },
              { label: 'Manage Skills', href: '/admin/skills', icon: '🛠️' },
              { label: 'View Portfolio', href: '/', icon: '🌐' },
            ].map(action => (
              <a key={action.label} href={action.href}
                className="glass-card rounded-xl p-4 text-center hover:border-[var(--primary)] transition-all group">
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors">{action.label}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
