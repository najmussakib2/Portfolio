'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; color: string
  life: number; maxLife: number
}

const COLORS = ['#0EA5E9', '#06B6D4', '#14B8A6', '#10B981', '#67E8F9']

export default function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let rafId: number
    const mouse = { x: 0, y: 0 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawn = (x: number, y: number) => ({
      x, y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: Math.random() * 2.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife: Math.random() * 50 + 30,
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles = particles.filter(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life++
        const dx = mouse.x - p.x; const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) { const f = (80 - dist) / 80; p.vx += (dx / dist) * f * 0.3; p.vy += (dy / dist) * f * 0.3 }
        p.vx *= 0.99; p.vy *= 0.99
        const alpha = 1 - p.life / p.maxLife
        ctx.save(); ctx.globalAlpha = alpha * 0.7
        ctx.shadowColor = p.color; ctx.shadowBlur = p.size * 3
        ctx.fillStyle = p.color; ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
        return p.life < p.maxLife
      })
      rafId = requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY
      if (Math.random() < 0.25) particles.push(spawn(e.clientX, e.clientY))
    }

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 10; i++) particles.push(spawn(e.clientX, e.clientY))
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: 'transparent' }}
    />
  )
}
