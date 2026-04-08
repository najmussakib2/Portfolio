'use client'

import { useEffect, useRef } from 'react'

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      stars.length = 0
      for (let i = 0; i < 160; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.2,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random() * 0.7 + 0.2,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.y += s.speed
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(14,165,233,${s.opacity})`
        ctx.shadowColor = '#06B6D4'
        ctx.shadowBlur = 4
        ctx.fill()
      })
      rafId = requestAnimationFrame(animate)
    }

    resize(); init()
    window.addEventListener('resize', () => { resize(); init() })
    rafId = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(rafId) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
