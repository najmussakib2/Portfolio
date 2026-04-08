'use client'

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="text-center md:text-left">
          <div className="text-2xl font-extrabold gradient-text mb-1" style={{ fontFamily: 'var(--font-display)' }}>NS</div>
          <p className="text-sm text-[var(--text-secondary)]">Full Stack Developer · Dhaka, Bangladesh</p>
        </div>

        <nav className="flex flex-wrap gap-6 justify-center">
          {['hero', 'about', 'skills', 'projects', 'blog', 'contact'].map(id => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors capitalize"
            >
              {id}
            </button>
          ))}
        </nav>

        <p className="text-xs text-[var(--text-secondary)] text-center md:text-right">
          © {new Date().getFullYear()} Najmus Sakib. Built with Next.js & Supabase.
        </p>
      </div>
    </footer>
  )
}
