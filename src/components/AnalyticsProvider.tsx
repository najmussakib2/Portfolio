'use client'

import { useAnalytics } from '@/hooks/useAnalytics'

// This component just mounts the analytics hook globally
// Drop it in the root layout once and all pages are tracked
export function AnalyticsProvider() {
  useAnalytics()
  return null
}
