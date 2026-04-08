'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Typewriter Hook ───────────────────────────────────────────────────────────
export function useTypewriter(words: string[], speed = 100, deleteSpeed = 70, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    const timeout = setTimeout(() => {
      if (isPaused) { setIsPaused(false); setIsDeleting(true); return }
      if (isDeleting) {
        setText(word.substring(0, text.length - 1))
        if (text.length === 1) { setIsDeleting(false); setWordIndex(i => (i + 1) % words.length) }
      } else {
        setText(word.substring(0, text.length + 1))
        if (text === word) setIsPaused(true)
      }
    }, isPaused ? pause : isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(timeout)
  }, [text, wordIndex, isDeleting, isPaused, words, speed, deleteSpeed, pause])

  return text
}

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// ─── Mouse Position Hook ───────────────────────────────────────────────────────
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handle = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])
  return pos
}

// ─── Smooth Mouse Hook (lagged) ────────────────────────────────────────────────
export function useSmoothMouse(lag = 0.12) {
  const [smooth, setSmooth] = useState({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    const animate = () => {
      setSmooth(prev => ({
        x: prev.x + (target.current.x - prev.x) * lag,
        y: prev.y + (target.current.y - prev.y) * lag,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    window.addEventListener('mousemove', handleMove)
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [lag])

  return smooth
}
