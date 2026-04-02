'use client'

import { useScrollReveal } from '@/hooks'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'fade'
  delay?: number
}

export default function Reveal({ children, className = '', direction = 'up', delay = 0 }: Props) {
  const { ref, isVisible } = useScrollReveal(0.08)

  const classMap = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    fade: 'reveal',
  }

  return (
    <div
      ref={ref}
      className={`${classMap[direction]} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
