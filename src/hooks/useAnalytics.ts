'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Generates or retrieves a persistent anonymous visitor ID
function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('_vid')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('_vid', id)
  }
  return id
}

// Generates a per-session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('_sid')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('_sid', id)
  }
  return id
}

export function useAnalytics() {
  const pathname = usePathname()
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const visitorId = getVisitorId()
    const sessionId = getSessionId()

    if (!visitorId || !sessionId) return

    // Track page visit
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        visitor_id: visitorId,
        session_id: sessionId,
        referrer: document.referrer || null,
      }),
    }).catch(() => {}) // Silent fail — never break the UI

    // Reset start time for duration tracking
    startTimeRef.current = Date.now()

    // Track time on page when leaving
    const handleUnload = () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000)
      if (duration < 1) return

      // Use sendBeacon for reliability on page unload
      navigator.sendBeacon(
        '/api/analytics/duration',
        JSON.stringify({
          page: pathname,
          visitor_id: visitorId,
          session_id: sessionId,
          duration_seconds: duration,
        })
      )
    }

    window.addEventListener('beforeunload', handleUnload)
    return () => {
      handleUnload() // Also track on route change (SPA navigation)
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [pathname])
}

// Standalone function to track CV download
export function trackCvDownload() {
  const visitorId = getVisitorId()
  if (!visitorId) return

  fetch('/api/analytics/cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitor_id: visitorId,
      referrer: document.referrer || null,
    }),
  }).catch(() => {})
}
