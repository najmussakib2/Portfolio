import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, visitor_id, session_id, referrer } = body

    if (!page || !visitor_id || !session_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get geo info from Vercel headers (auto-populated on Vercel)
    const ip_country = request.headers.get('x-vercel-ip-country') || null
    const ip_city = request.headers.get('x-vercel-ip-city') || null
    const user_agent = request.headers.get('user-agent') || null

    const supabase = createAdminClient()

    const { error } = await supabase.from('page_visits').insert({
      page,
      visitor_id,
      session_id,
      ip_country,
      ip_city,
      referrer: referrer || null,
      user_agent,
    })

    if (error) throw error

    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('[Analytics Track]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track visit' },
      { status: 500 }
    )
  }
}
