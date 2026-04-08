'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  id: string; name: string; role: string; company: string; avatar_url: string
  content: string; rating: number; visible: boolean; order_index: number
}

const EMPTY = { name: '', role: '', company: '', avatar_url: '', content: '', rating: 5, visible: true, order_index: 0 }

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    fetch('/api/admin/testimonials').then(r => r.json()).then(d => {
      setItems(d.data || []); setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(EMPTY); setEditing(null); setModal(true) }
  const openEdit = (t: Testimonial) => { setForm({ ...t }); setEditing(t.id); setModal(true) }

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch('/api/admin/testimonials', {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing ? { id: editing, ...form } : form),
    })
    if ((await res.json()).success) { setModal(false); load() }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Testimonials</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{items.length} testimonials</p>
        </div>
        <button onClick={openCreate} className="btn-primary">+ Add Testimonial</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{[1,2].map(i => <div key={i} className="glass-card rounded-2xl h-40 animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(t => (
            <div key={t.id} className="glass-card rounded-2xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/20 to-teal-500/20 flex items-center justify-center font-bold text-[var(--primary)] flex-shrink-0">
                  {t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[var(--text-primary)] text-sm">{t.name}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{t.role}{t.company ? ` @ ${t.company}` : ''}</div>
                  <div className="text-yellow-400 text-xs mt-0.5">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                </div>
                <span className={`tag-pill text-xs ${t.visible ? 'text-emerald-400 border-emerald-400/30' : 'text-[var(--text-secondary)]'}`}>
                  {t.visible ? 'Visible' : 'Hidden'}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-3">"{t.content}"</p>
              <div className="flex gap-2 pt-1">
                <button onClick={() => openEdit(t)} className="btn-outline py-1.5 px-3 text-xs flex-1 justify-center">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-all">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-2 glass-card rounded-2xl p-12 text-center text-[var(--text-secondary)]">
              No testimonials yet.
            </div>
          )}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                {editing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={() => setModal(false)} className="text-[var(--text-secondary)] text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[['Name', 'name'], ['Role', 'role'], ['Company', 'company'], ['Avatar URL', 'avatar_url']].map(([label, key]) => (
                <div key={key} className={key === 'avatar_url' ? 'col-span-2' : ''}>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">{label}</label>
                  <input value={String((form as any)[key] ?? '')}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm" />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Testimonial Content</label>
              <textarea rows={4} value={form.content}
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm resize-none" />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">Rating: {form.rating}/5</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setForm(p => ({ ...p, rating: n }))}
                    className={`text-2xl transition-all ${n <= form.rating ? 'text-yellow-400' : 'text-white/20'}`}>★</button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setForm(p => ({ ...p, visible: !p.visible }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.visible ? 'bg-gradient-to-r from-sky-500 to-cyan-500' : 'bg-white/20'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.visible ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm text-[var(--text-secondary)]">Show on portfolio</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save'}
              </button>
              <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
