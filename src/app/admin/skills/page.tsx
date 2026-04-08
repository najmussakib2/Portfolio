/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'

interface Skill {
  id: string; name: string; category: string; proficiency: number; icon: string; order_index: number
}

const EMPTY = { name: '', category: 'frontend', proficiency: 80, icon: '', order_index: 0 }
const CATEGORIES = ['frontend', 'backend', 'devops', 'tools', 'other']

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    fetch('/api/admin/skills').then(r => r.json()).then(d => {
      setSkills(d.data || []); setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat)
    return acc
  }, {} as Record<string, Skill[]>)

  const openCreate = () => { setForm(EMPTY); setEditing(null); setModal(true) }
  const openEdit = (s: Skill) => { setForm({ ...s }); setEditing(s.id); setModal(true) }

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch('/api/admin/skills', {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing ? { id: editing, ...form } : form),
    })
    if ((await res.json()).success) { setModal(false); load() }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return
    await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Skills</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{skills.length} skills across {CATEGORIES.length} categories</p>
        </div>
        <button onClick={openCreate} className="btn-primary">+ Add Skill</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">{[1,2,3,4].map(i => <div key={i} className="glass-card rounded-2xl h-40 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.filter(cat => grouped[cat]?.length > 0).map(cat => (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3 capitalize">{cat}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {grouped[cat].map(skill => (
                  <div key={skill.id} className="glass-card rounded-2xl p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[var(--text-primary)] text-sm">{skill.name}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"
                            style={{ width: `${skill.proficiency}%` }} />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">{skill.proficiency}%</span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => openEdit(skill)} className="w-7 h-7 rounded-lg glass-card flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] text-xs transition-colors">✏️</button>
                      <button onClick={() => handleDelete(skill.id)} className="w-7 h-7 rounded-lg glass-card flex items-center justify-center text-[var(--text-secondary)] hover:text-red-400 text-xs transition-colors">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {skills.length === 0 && (
            <div className="glass-card rounded-2xl p-12 text-center text-[var(--text-secondary)]">
              No skills yet. Click &quot;Add Skill&quot; to get started.
            </div>
          )}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-3xl p-8 w-full max-w-md space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                {editing ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <button onClick={() => setModal(false)} className="text-[var(--text-secondary)] text-xl">✕</button>
            </div>

            {[['Skill Name', 'name', 'text'], ['Icon URL (optional)', 'icon', 'text']].map(([label, key, type]) => (
              <div key={key}>
                <label className="block text-sm text-[var(--text-secondary)] mb-1.5">{label}</label>
                <input type={type} value={String((form as any)[key] ?? '')}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm" />
              </div>
            ))}

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-light)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm">
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-[var(--bg-light)]">{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Proficiency: {form.proficiency}%</label>
              <input type="range" min={1} max={100} value={form.proficiency}
                onChange={e => setForm(p => ({ ...p, proficiency: parseInt(e.target.value) }))}
                className="w-full accent-sky-500" />
              <div className="h-2 rounded-full bg-white/10 mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full transition-all"
                  style={{ width: `${form.proficiency}%` }} />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Skill'}
              </button>
              <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
