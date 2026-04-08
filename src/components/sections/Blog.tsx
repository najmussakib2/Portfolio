'use client'

import { useState, useEffect } from 'react'
import Reveal from '@/components/ui/Reveal'
import Link from 'next/link'

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

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/blog?limit=3')
      .then(r => r.json())
      .then(d => { setPosts(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const displayPosts = posts.length > 0 ? posts : (loading ? [] : PLACEHOLDER_POSTS)

  return (
    <section id="blog" className="py-28 relative">
      <div className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="tag-pill mb-4 inline-block">Thoughts & learnings</span>
          <h2 className="section-title gradient-text">Blog</h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            Writing about web development, architecture patterns, and lessons learned building real apps.
          </p>
        </Reveal>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="glass-card rounded-2xl h-72 animate-pulse">
                <div className="h-36 rounded-t-2xl bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 100}>
                <a href={`/blog/${post.slug}`} data-hover
                  className="glass-card rounded-2xl overflow-hidden group block h-full hover:no-underline">
                  {/* Cover */}
                  <div className="h-40 bg-gradient-to-br from-sky-500/10 to-teal-500/10 relative overflow-hidden">
                    {post.cover_image_url ? (
                      <img src={post.cover_image_url} alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">✍️</div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="tag-pill text-xs">{tag}</span>
                      ))}
                    </div>

                    <h3 className="text-base font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}>
                      {post.title}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                      <span className="text-xs text-[var(--text-secondary)]">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Draft'}
                      </span>
                      <span className="text-xs text-[var(--cyan)] font-medium group-hover:underline">Read more →</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="text-center mt-10">
          <Link href="/blog" data-hover className="btn-outline">
            View All Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

const PLACEHOLDER_POSTS: Post[] = [
  { id: '1', title: 'Building a Portfolio with Next.js and Supabase', slug: 'building-portfolio-nextjs-supabase', excerpt: 'A walkthrough of how I built this portfolio using Next.js 14, Supabase, and Tailwind CSS with full admin functionality.', cover_image_url: null, tags: ['Next.js', 'Supabase'], published_at: new Date().toISOString(), created_at: new Date().toISOString() },
  { id: '2', title: 'Why I Chose Supabase Over Firebase', slug: 'supabase-vs-firebase', excerpt: 'An honest comparison of Supabase and Firebase for solo developers building modern web apps.', cover_image_url: null, tags: ['Supabase', 'Backend'], published_at: new Date().toISOString(), created_at: new Date().toISOString() },
  { id: '3', title: 'Mastering TypeScript Generics', slug: 'mastering-typescript-generics', excerpt: 'A deep dive into TypeScript generics with real-world examples that will transform how you write type-safe code.', cover_image_url: null, tags: ['TypeScript'], published_at: new Date().toISOString(), created_at: new Date().toISOString() },
]
