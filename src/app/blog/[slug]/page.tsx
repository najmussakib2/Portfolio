'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string | null
  tags: string[]
  published_at: string | null
  created_at: string
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params?.slug) return
    fetch(`/api/admin/blog?slug=${params.slug}`)
      .then(r => r.json())
      .then(d => { setPost(d.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [params?.slug])

  if (loading) return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <div className="h-10 glass-card rounded-xl animate-pulse w-3/4" />
          <div className="h-4 glass-card rounded animate-pulse w-1/4" />
          <div className="h-64 glass-card rounded-2xl animate-pulse mt-8" />
        </div>
      </main>
    </>
  )

  if (!post) return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Post not found</h1>
          <a href="/blog" className="btn-primary">← Back to Blog</a>
        </div>
      </main>
    </>
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-6">

          {/* Back */}
          <a href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors mb-8 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Blog
          </a>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
          </div>

          {/* Title */}
          <h1 className="section-title text-[var(--text-primary)] mb-4 leading-tight">{post.title}</h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-8 pb-8 border-b border-[var(--border)]">
            <span>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : 'Draft'}
            </span>
            <span>·</span>
            <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
          </div>

          {/* Cover */}
          {post.cover_image_url && (
            <img src={post.cover_image_url} alt={post.title}
              className="w-full h-64 object-cover rounded-2xl mb-10" />
          )}

          {/* Content — rendered as markdown-like prose */}
          <div className="prose-custom">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-3" style={{ fontFamily: 'var(--font-display)' }}>{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-[var(--text-primary)] mt-6 mb-2">{line.slice(4)}</h3>
              if (line.startsWith('- ')) return <li key={i} className="text-[var(--text-secondary)] ml-4 mb-1 list-disc">{line.slice(2)}</li>
              if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-[var(--text-primary)] my-2">{line.slice(2, -2)}</p>
              if (line === '') return <br key={i} />
              return <p key={i} className="text-[var(--text-secondary)] leading-relaxed mb-3">{line}</p>
            })}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
