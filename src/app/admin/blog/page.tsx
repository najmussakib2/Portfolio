'use client'

import { useState, useEffect } from 'react'

interface Post {
  id: string; title: string; slug: string; excerpt: string
  content: string; cover_image_url: string; tags: string[]
  published: boolean; published_at: string | null; created_at: string
}

const EMPTY = { title: '', slug: '', excerpt: '', content: '', cover_image_url: '', tags: [], published: false }

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const load = () => {
    setLoading(true)
    fetch('/api/admin/blog?admin=true&limit=50').then(r => r.json()).then(d => {
      setPosts(d.data || []); setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const openCreate = () => { setForm(EMPTY); setEditing(null); setTagInput(''); setModal(true) }
  const openEdit = (p: Post) => {
    setForm({ ...p, cover_image_url: p.cover_image_url ?? '' }); setEditing(p.id); setTagInput(p.tags.join(', ')); setModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, tags: tagInput.split(',').map(t => t.trim()).filter(Boolean) }
    const res = await fetch('/api/admin/blog', {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing ? { id: editing, ...payload } : payload),
    })
    if ((await res.json()).success) { setModal(false); load() }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' })
    load()
  }

  const togglePublish = async (p: Post) => {
    await fetch('/api/admin/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: p.id, published: !p.published }),
    })
    load()
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Blog</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{posts.length} posts</p>
        </div>
        <button onClick={openCreate} className="btn-primary">+ New Post</button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="glass-card rounded-2xl h-20 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {posts.map(p => (
            <div key={p.id} className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-[var(--text-primary)] truncate">{p.title}</h3>
                  <span className={`tag-pill text-xs ${p.published ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : 'text-amber-400 border-amber-400/30 bg-amber-400/10'}`}>
                    {p.published ? '● Published' : '○ Draft'}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] truncate mt-0.5">{p.excerpt}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {p.tags.slice(0, 3).map(t => <span key={t} className="tag-pill text-xs">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => togglePublish(p)} className={`px-3 py-1.5 rounded-full border text-sm transition-all ${p.published ? 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10' : 'border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10'}`}>
                  {p.published ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => openEdit(p)} className="btn-outline py-1.5 px-3 text-sm">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-all">Delete</button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="glass-card rounded-2xl p-12 text-center text-[var(--text-secondary)]">
              No blog posts yet. Click "New Post" to write your first article.
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
                {editing ? 'Edit Post' : 'New Post'}
              </h2>
              <button onClick={() => setModal(false)} className="text-[var(--text-secondary)] text-xl">✕</button>
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Title</label>
              <input value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value, slug: autoSlug(e.target.value) }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm" />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Slug</label>
              <input value={form.slug}
                onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm font-mono" />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Excerpt</label>
              <textarea rows={2} value={form.excerpt}
                onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm resize-none" />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Content (Markdown)</label>
              <textarea rows={10} value={form.content}
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                placeholder="## Introduction&#10;&#10;Write your post here..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm resize-none font-mono" />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Cover Image URL</label>
              <input value={form.cover_image_url}
                onChange={e => setForm(p => ({ ...p, cover_image_url: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm" />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Tags (comma separated)</label>
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                placeholder="Next.js, React, Tutorial"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] text-sm" />
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setForm(p => ({ ...p, published: !p.published }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.published ? 'bg-gradient-to-r from-sky-500 to-cyan-500' : 'bg-white/20'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm text-[var(--text-secondary)]">Publish immediately</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Post'}
              </button>
              <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
