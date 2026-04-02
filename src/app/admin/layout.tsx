'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  { href: '/admin/projects', label: 'Projects', icon: '🚀' },
  { href: '/admin/skills', label: 'Skills', icon: '🛠️' },
  { href: '/admin/blog', label: 'Blog', icon: '✍️' },
  { href: '/admin/messages', label: 'Messages', icon: '📬' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 glass-card border-r border-[var(--border)] flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* Logo */}
        <div className="p-6 border-b border-[var(--border)]">
          <div className="text-2xl font-extrabold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>NS Admin</div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">Portfolio Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border border-sky-500/30 text-[var(--primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-[var(--border)] space-y-2">
          <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors">
            <span>🌐</span> View Portfolio
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-20 glass-card border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-[var(--text-secondary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-sm text-[var(--text-secondary)]">
            {NAV.find(n => n.href === pathname)?.label ?? 'Admin'}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--emerald)] animate-pulse" />
            <span className="text-xs text-[var(--text-secondary)]">Online</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
