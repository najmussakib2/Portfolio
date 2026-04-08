'use client'

import Reveal from '@/components/ui/Reveal'
import useGetMe from '@/contexts/useGetMe'
import { trackCvDownload } from '@/hooks/useAnalytics'

export default function About() {
  const { data } = useGetMe()

  return (
    <section id="about" className="py-28 relative">
      <div className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(20,184,166,0.08) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — visual */}
          <Reveal direction="left">
            <div className="relative">
              {/* Main card */}
              <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30"
                  style={{ background: 'radial-gradient(circle, #0EA5E9, transparent)' }} />

                {/* Avatar */}
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-sky-500/30 to-teal-500/30 border border-cyan-400/30 flex items-center justify-center text-5xl mb-6">
                  {
                    data && data.avatar_url ?
                      <img src={data?.avatar_url} className="w-full h-full object-cover rounded-2xl" />
                      :
                      <span>👨‍💻</span>
                  }
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {data?.name ?? "Najmus Sakib"}
                </h3>
                <p className="text-[var(--cyan)] font-medium mb-4">Full Stack Developer</p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {data?.location ?? "Based in Dhaka, Bangladesh 🇧🇩"}
                </p>

                {/* Status badge */}
                {
                data?.open_to_work?
                  <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-400 font-medium">Available for work</span>
                </div>
                  :
                <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-400/20 w-fit">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-sm text-red-400 font-medium">Not Available for work</span>
                </div>
                }
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -right-4 glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>2+</div>
                <div className="text-xs text-[var(--text-secondary)]">Years Exp.</div>
              </div>
              <div className="absolute -top-4 -left-4 glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>15+</div>
                <div className="text-xs text-[var(--text-secondary)]">Projects</div>
              </div>
            </div>
          </Reveal>

          {/* Right — text */}
          <Reveal direction="right">
            <div className="space-y-6">
              <div>
                <span className="tag-pill mb-3 inline-block">About me</span>
                <h2 className="section-title gradient-text">Crafting Digital Experiences</h2>
              </div>

              <p className="text-[var(--text-secondary)] leading-relaxed">
                I&apos;m a passionate full stack developer from Bangladesh with a love for building
                modern, performant web applications. I specialize in the JavaScript ecosystem
                and enjoy turning complex problems into elegant, user-friendly solutions.
              </p>

              <p className="text-[var(--text-secondary)] leading-relaxed">
                My journey started with curiosity about how websites work, and it has grown into
                a deep expertise in React, Next.js, Node.js, and cloud infrastructure. I believe
                great software is built at the intersection of clean code and thoughtful design.
              </p>

              {/* Skills highlight */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '⚡', text: 'Performance-first development' },
                  { icon: '🎨', text: 'UI/UX minded engineering' },
                  { icon: '🔒', text: 'Security & best practices' },
                  { icon: '📱', text: 'Mobile-first responsive design' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={data?.cv_url??"/cv.pdf"}
                  target="_blank"
                  download
                  onClick={trackCvDownload}
                  data-hover
                  className="btn-primary"
                >
                  Download CV
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  data-hover
                  className="btn-outline"
                >
                  Let&apos;s Talk
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
