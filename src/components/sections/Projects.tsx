'use client'

import { useState, useEffect } from 'react'
import Reveal from '@/components/ui/Reveal'

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url: string | null
  live_url: string | null
  image_url: string | null
  category: string
  featured: boolean
}

const FILTERS = ['all', 'fullstack', 'frontend', 'backend', 'mobile']

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [mouse, setMouse] = useState<{ [key: string]: { x: number; y: number } }>({})

  useEffect(() => {
    fetch('/api/admin/projects')
      .then(r => r.json())
      .then(d => { setProjects(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  const handleMouseMove = (e: React.MouseEvent, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse(prev => ({ ...prev, [id]: { x: e.clientX - rect.left, y: e.clientY - rect.top } }))
  }

  // Placeholder projects for when DB is empty
  const displayProjects = filtered.length > 0 ? filtered : (loading ? [] : PLACEHOLDER_PROJECTS.filter(
    p => filter === 'all' || p.category === filter
  ))

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(14,165,233,0.08) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="tag-pill mb-4 inline-block">What I've built</span>
          <h2 className="section-title gradient-text">Projects</h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            A selection of projects that showcase my range across the full stack.
          </p>
        </Reveal>

        {/* Filter buttons */}
        <Reveal className="flex flex-wrap gap-2 justify-center mb-12">
          <div className="glass-card rounded-2xl p-1.5 flex gap-1 flex-wrap justify-center">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-hover
                className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                  filter === f
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="glass-card rounded-2xl h-80 animate-pulse">
                <div className="h-48 rounded-t-2xl bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-4 rounded bg-white/5 w-3/4" />
                  <div className="h-3 rounded bg-white/5 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 80}>
                <div
                  className="glass-card rounded-2xl overflow-hidden spotlight-card group h-full flex flex-col"
                  onMouseMove={e => handleMouseMove(e, project.id)}
                  style={{
                    '--mouse-x': `${mouse[project.id]?.x ?? 50}px`,
                    '--mouse-y': `${mouse[project.id]?.y ?? 50}px`,
                  } as React.CSSProperties}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-sky-500/10 to-teal-500/10">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl opacity-30">🚀</span>
                      </div>
                    )}
                    {project.featured && (
                      <span className="absolute top-3 right-3 tag-pill text-xs bg-amber-400/20 border-amber-400/40 text-amber-400">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div>
                      <span className="text-xs text-[var(--cyan)] font-medium uppercase tracking-wider capitalize">{project.category}</span>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-3">{project.description}</p>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech_stack.slice(0, 4).map(tech => (
                        <span key={tech} className="tag-pill text-xs">{tech}</span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="tag-pill text-xs">+{project.tech_stack.length - 4}</span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" data-hover
                          className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                          Code
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" data-hover
                          className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {!loading && displayProjects.length === 0 && (
          <div className="text-center py-20 text-[var(--text-secondary)]">
            No projects found for this category.
          </div>
        )}
      </div>
    </section>
  )
}

const PLACEHOLDER_PROJECTS: Project[] = [
  { id: '1', title: 'Portfolio CMS', description: 'A full-featured portfolio with admin dashboard, analytics, and blog system built with Next.js and Supabase.', tech_stack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind'], github_url: '#', live_url: '#', image_url: null, category: 'fullstack', featured: true },
  { id: '2', title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with cart, payments, and real-time inventory management.', tech_stack: ['React', 'Node.js', 'MongoDB', 'Stripe'], github_url: '#', live_url: '#', image_url: null, category: 'fullstack', featured: false },
  { id: '3', title: 'Task Manager API', description: 'RESTful API for task and project management with role-based access control and JWT auth.', tech_stack: ['Node.js', 'PostgreSQL', 'JWT', 'Docker'], github_url: '#', live_url: null, image_url: null, category: 'backend', featured: false },
]
