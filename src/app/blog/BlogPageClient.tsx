'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import MouseParticles from '@/components/ui/MouseParticles'
import Reveal from '@/components/ui/Reveal'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image_url: string | null
  tags: string[]
  published_at: string | null
  created_at: string
}

export default function BlogPageClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/blog?limit=50')
      .then(r => r.json())
      .then(d => { setPosts(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const allTags = [...new Set(posts.flatMap(p => p.tags))]

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchTag = !activeTag || p.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  return (
    <>
      <CustomCursor />
      <MouseParticles />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <Reveal className="text-center mb-12">
            <span className="tag-pill mb-4 inline-block">My writing</span>
            <h1 className="section-title gradient-text">Blog</h1>
            <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
              Thoughts on web development, architecture, and lessons from building real products.
            </p>
          </Reveal>

          {/* Search + Tags */}
          <Reveal className="mb-10 space-y-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-all"
            />
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`tag-pill cursor-pointer ${!activeTag ? 'bg-[var(--primary)]/20 border-[var(--primary)]' : ''}`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`tag-pill cursor-pointer ${activeTag === tag ? 'bg-[var(--primary)]/20 border-[var(--primary)]' : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card rounded-2xl h-32 animate-pulse" />
              ))}
            </div>
          )}

          {/* Posts */}
          {!loading && (
            <div className="space-y-5">
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-[var(--text-secondary)]">
                  No posts found.
                </div>
              ) : filtered.map((post, i) => (
                <Reveal key={post.id} delay={i * 60}>
                  <a href={`/blog/${post.slug}`} data-hover
                    className="glass-card rounded-2xl p-6 flex gap-5 group block hover:no-underline">
                    {post.cover_image_url && (
                      <img src={post.cover_image_url} alt={post.title}
                        className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag-pill text-xs">{tag}</span>
                        ))}
                      </div>
                      <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors truncate"
                        style={{ fontFamily: 'var(--font-display)' }}>
                        {post.title}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">{post.excerpt}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-2">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                          : 'Draft'}
                      </p>
                    </div>
                    <div className="text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors self-center text-xl">→</div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
