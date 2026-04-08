'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { usePathname, useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const { isDark, toggleTheme } = useTheme()
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = NAV_ITEMS.map(i => document.getElementById(i.id))
      const current = sections.findIndex(s => {
        if (!s) return false
        const rect = s.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom > 100
      })
      if (current !== -1) setActive(NAV_ITEMS[current].id)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const redirectButton = ({path, scroll}:{path: string, scroll: string}) => {
    if(pathname === "/"){
      scrollTo(scroll)
    }else{
      router.replace(path)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-card border-0 border-b' : 'py-5 bg-transparent'
      } flex flex-col items-center`}>
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => redirectButton({path: '/',scroll: 'hero'}) } className="font-display font-800 text-xl" style={{ fontFamily: 'var(--font-display)' }}>
          <span className="gradient-text font-extrabold text-2xl tracking-tight">NS</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => redirectButton({path: `/${item.id}`, scroll: item.id})}
                className={`text-sm font-medium transition-all duration-200 relative group ${active === item.id
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] transition-all duration-300 ${active === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            data-hover
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[var(--cyan)] hover:text-[var(--primary)] transition-colors"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <a href="/admin" data-hover className="btn-outline text-sm py-2 px-5">
            Admin
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-[var(--text-primary)]"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t mt-2 px-6 py-6 space-y-4">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => redirectButton({path: `/${item.id}`, scroll: item.id})}
              className={`block w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 border-l-4 ${active === item.id
                ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/5'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--cyan)]'
                }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={toggleTheme} className="btn-outline text-sm py-2 px-4 flex-1">
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
            <a href="/admin" className="btn-primary text-sm py-2 px-4 flex-1 text-center">
              Admin
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
