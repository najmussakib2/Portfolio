'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string; name: string; email: string; subject: string; message: string; read: boolean; created_at: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  const load = () => {
    fetch('/api/contact').then(r => r.json()).then(d => {
      setMessages(d.data || []); setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const markRead = async (id: string, read: boolean) => {
    await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read }) })
    load()
  }

  const openMessage = (msg: Message) => {
    setSelected(msg)
    if (!msg.read) markRead(msg.id, true)
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Messages</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{unread} unread · {messages.length} total</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="glass-card rounded-2xl h-20 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="glass-card rounded-2xl p-12 text-center text-[var(--text-secondary)]">
              No messages yet. They'll appear here when someone fills out your contact form.
            </div>
          )}
          {messages.map(msg => (
            <div key={msg.id}
              onClick={() => openMessage(msg)}
              className={`glass-card rounded-2xl p-5 cursor-pointer transition-all ${!msg.read ? 'border-sky-500/30 bg-sky-500/5' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/20 flex items-center justify-center text-lg flex-shrink-0">
                  {msg.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[var(--text-primary)]">{msg.name}</span>
                    <span className="text-sm text-[var(--text-secondary)]">{msg.email}</span>
                    {!msg.read && <span className="tag-pill text-xs text-sky-400 border-sky-400/30 bg-sky-400/10">New</span>}
                    <span className="text-xs text-[var(--text-secondary)] ml-auto">
                      {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">{msg.subject}</p>
                  <p className="text-sm text-[var(--text-secondary)] truncate mt-0.5">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-3xl p-8 w-full max-w-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{selected.subject}</h2>
              <button onClick={() => setSelected(null)} className="text-[var(--text-secondary)] text-xl">✕</button>
            </div>
            <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/20 flex items-center justify-center font-bold text-[var(--primary)]">
                {selected.name[0]?.toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-[var(--text-primary)]">{selected.name}</div>
                <a href={`mailto:${selected.email}`} className="text-sm text-[var(--cyan)] hover:underline">{selected.email}</a>
              </div>
              <div className="ml-auto text-xs text-[var(--text-secondary)]">
                {new Date(selected.created_at).toLocaleString()}
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap text-sm">
              {selected.message}
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary">
                Reply via Email
              </a>
              <button onClick={() => { markRead(selected.id, !selected.read); setSelected(null) }} className="btn-outline">
                Mark as {selected.read ? 'Unread' : 'Read'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
