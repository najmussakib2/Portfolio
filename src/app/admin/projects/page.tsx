/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'

interface Project {
  id: string; title: string; description: string; long_description: string
  tech_stack: string[]; github_url: string; live_url: string; image_url: string
  featured: boolean; order_index: number; category: string
}

const EMPTY: Omit<Project, 'id'> = {
  title: '', description: '', long_description: '', tech_stack: [],
  github_url: '', live_url: '', image_url: '', featured: false, order_index: 0, category: 'fullstack'
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<typeof EMPTY>(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [techInput, setTechInput] = useState('')

  const load = () => {
    setLoading(true)
    fetch('/api/admin/projects?admin=true').then(r => r.json()).then(d => {
      setProjects(d.data || []); setLoading(false)
    })
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(EMPTY); setEditing(null); setTechInput(''); setModal(true) }
  const openEdit = (p: Project) => {
    setForm({ ...p }); setEditing(p.id); setTechInput(p.tech_stack.join(', ')); setModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, tech_stack: techInput.split(',').map(t => t.trim()).filter(Boolean) }
    const res = await fetch('/api/admin/projects', {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing ? { id: editing, ...payload } : payload),
    })
    if ((await res.json()).success) { setModal(false); load() }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Projects</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{projects.length} projects</p>
        </div>
        <button onClick={openCreate} className="btn-primary">+ New Project</button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="glass-card rounded-2xl h-20 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 flex items-center justify-center text-xl flex-shrink-0">
                {p.image_url ? <img src={p.image_url} className="w-full h-full object-cover rounded-xl" /> : '🚀'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[var(--text-primary)] truncate">{p.title}</h3>
                  {p.featured && <span className="tag-pill text-xs">⭐ Featured</span>}
                  <span className="tag-pill text-xs capitalize">{p.category}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] truncate mt-0.5">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {p.tech_stack.slice(0, 4).map(t => <span key={t} className="tag-pill text-xs">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="btn-outline py-1.5 px-3 text-sm">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-all">Delete</button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="glass-card rounded-2xl p-12 text-center text-[var(--text-secondary)]">
              No projects yet. Click &quot;New Project&quot; to add one.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                {editing ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={() => setModal(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xl">✕</button>
            </div>

            {[
              ['Title', 'title'], ['Description', 'description'], ['Image URL', 'image_url'],
              ['GitHub URL', 'github_url'], ['Live URL', 'live_url'],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="block text-sm text-[var(--text-secondary)] mb-1.5">{label}</label>
                <input
                  value={String((form as any)[key] ?? '')}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-all text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Tech Stack (comma separated)</label>
              <input
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-light)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm"
                >
                  {['fullstack', 'frontend', 'backend', 'mobile', 'other'].map(c => (
                    <option key={c} value={c} className="bg-[var(--bg-light)]">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Order Index</label>
                <input
                  type="number"
                  value={form.order_index}
                  onChange={e => setForm(p => ({ ...p, order_index: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setForm(p => ({ ...p, featured: !p.featured }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.featured ? 'bg-gradient-to-r from-sky-500 to-cyan-500' : 'bg-white/20'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm text-[var(--text-secondary)]">Featured project</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Project'}
              </button>
              <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
