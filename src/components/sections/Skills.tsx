'use client'

import Reveal from '@/components/ui/Reveal'

const MARQUEE_SKILLS = [
  { label: 'React', color: '#61DAFB' },
  { label: 'Next.js', color: '#ffffff' },
  { label: 'TypeScript', color: '#3178C6' },
  { label: 'Node.js', color: '#339933' },
  { label: 'Supabase', color: '#3ECF8E' },
  { label: 'PostgreSQL', color: '#336791' },
  { label: 'Tailwind CSS', color: '#06B6D4' },
  { label: 'GraphQL', color: '#E10098' },
  { label: 'Docker', color: '#2496ED' },
  { label: 'Git', color: '#F05032' },
  { label: 'MongoDB', color: '#47A248' },
  { label: 'Redis', color: '#DC382D' },
  { label: 'Prisma', color: '#2D3748' },
  { label: 'tRPC', color: '#398CCB' },
  { label: 'Framer Motion', color: '#BB4AEF' },
  { label: 'Vercel', color: '#ffffff' },
]

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'from-sky-500/20 to-cyan-500/20',
    border: 'border-sky-500/30',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'from-teal-500/20 to-emerald-500/20',
    border: 'border-teal-500/30',
    skills: ['Node.js', 'Express', 'GraphQL', 'REST API', 'tRPC', 'Prisma'],
  },
  {
    title: 'Database',
    icon: '🗄️',
    color: 'from-cyan-500/20 to-teal-500/20',
    border: 'border-cyan-500/30',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'MySQL', 'SQLite'],
  },
  {
    title: 'DevOps & Tools',
    icon: '🛠️',
    color: 'from-emerald-500/20 to-sky-500/20',
    border: 'border-emerald-500/30',
    skills: ['Docker', 'Git', 'GitHub', 'Vercel', 'CI/CD', 'Linux'],
  },
]

const marqueeDouble = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS]

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="tag-pill mb-4 inline-block">What I work with</span>
          <h2 className="section-title gradient-text">Skills & Technologies</h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            A collection of tools and technologies I've honed over years of building real-world applications.
          </p>
        </Reveal>

        {/* Marquee Row 1 — left */}
        <div className="relative overflow-hidden mb-4 py-2">
          <div className="flex gap-4 marquee-track" style={{ width: 'max-content' }}>
            {marqueeDouble.map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 glass-card rounded-full whitespace-nowrap">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-sm font-medium text-[var(--text-primary)]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 — right */}
        <div className="relative overflow-hidden mb-16 py-2">
          <div className="flex gap-4 marquee-track-reverse" style={{ width: 'max-content' }}>
            {[...marqueeDouble].reverse().map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 glass-card rounded-full whitespace-nowrap">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-sm font-medium text-[var(--text-primary)]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 100}>
              <div className={`glass-card rounded-2xl p-6 h-full bg-gradient-to-br ${cat.color} border ${cat.border} spotlight-card`}>
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="tag-pill text-xs">{skill}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
