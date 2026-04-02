'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(14,165,233,0.08) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="tag-pill mb-4 inline-block">Get in touch</span>
          <h2 className="section-title gradient-text">Contact</h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left — info */}
          <Reveal direction="left" className="lg:col-span-2 space-y-6">
            {[
              { icon: '📧', label: 'Email', value: 'najmussakib@example.com', href: 'mailto:najmussakib@example.com' },
              { icon: '📍', label: 'Location', value: 'Dhaka, Bangladesh', href: null },
              { icon: '🕐', label: 'Response time', value: 'Within 24–48 hours', href: null },
            ].map(item => (
              <div key={item.label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-[var(--text-primary)] font-medium hover:text-[var(--primary)] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-[var(--text-primary)] font-medium">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-sm text-[var(--text-secondary)] mb-4">Find me on</p>
              <div className="flex gap-3">
                {[
                  { label: 'GitHub', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                  { label: 'LinkedIn', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { label: 'Twitter', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-hover
                    className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                    aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal direction="right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-5">
              <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                Send a Message 🚀
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['name', 'email'] as const).map(field => (
                  <div key={field}>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1.5 capitalize">{field}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      required
                      value={form[field]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] focus:bg-white/8 transition-all text-sm"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                  placeholder="Project inquiry, collaboration..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-all text-sm resize-none"
                />
              </div>

              <button type="submit" disabled={status === 'loading'} data-hover className="btn-primary w-full justify-center">
                {status === 'loading' ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : status === 'success' ? (
                  <>✅ Message Sent!</>
                ) : status === 'error' ? (
                  <>❌ Failed. Try again</>
                ) : (
                  <>Send Message <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
