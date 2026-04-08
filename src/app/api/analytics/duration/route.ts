import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, visitor_id, session_id, duration_seconds } = body

    if (!page || !visitor_id || !session_id || duration_seconds == null) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    const { error } = await supabase.from('page_durations').insert({
      page,
      visitor_id,
      session_id,
      duration_seconds: Math.round(duration_seconds),
    })

    if (error) throw error

    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('[Analytics Duration]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track duration' },
      { status: 500 }
    )
  }
}
