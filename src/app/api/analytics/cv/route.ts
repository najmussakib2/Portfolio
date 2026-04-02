import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { visitor_id, referrer } = body

    if (!visitor_id) {
      return NextResponse.json(
        { success: false, error: 'Missing visitor_id' },
        { status: 400 }
      )
    }

    const ip_country = request.headers.get('x-vercel-ip-country') || null
    const supabase = createAdminClient()

    const { error } = await supabase.from('cv_downloads').insert({
      visitor_id,
      ip_country,
      referrer: referrer || null,
    })

    if (error) throw error

    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('[CV Download]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track CV download' },
      { status: 500 }
    )
  }
}

// GET — fetch CV download stats (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('cv_downloads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    const total = data.length
    const byCountry = data.reduce((acc: Record<string, number>, row) => {
      const country = row.ip_country || 'Unknown'
      acc[country] = (acc[country] || 0) + 1
      return acc
    }, {})

    return NextResponse.json({
      success: true,
      data: {
        total,
        recent: data.slice(0, 20),
        by_country: Object.entries(byCountry)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count),
      },
    })
  } catch (error) {
    console.error('[CV Download Stats]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch CV stats' },
      { status: 500 }
    )
  }
}
