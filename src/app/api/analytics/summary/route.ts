import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30' // days

    const since = new Date()
    since.setDate(since.getDate() - parseInt(range))
    const sinceISO = since.toISOString()

    // Total visits
    const { count: totalVisits } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sinceISO)

    // Unique visitors
    const { data: uniqueData } = await supabase
      .from('page_visits')
      .select('visitor_id')
      .gte('created_at', sinceISO)

    const uniqueVisitors = new Set(uniqueData?.map((r) => r.visitor_id)).size

    // Average duration
    const { data: durationData } = await supabase
      .from('page_durations')
      .select('duration_seconds')
      .gte('created_at', sinceISO)

    const avgDuration =
      durationData && durationData.length > 0
        ? Math.round(
            durationData.reduce((sum, r) => sum + r.duration_seconds, 0) /
              durationData.length
          )
        : 0

    // CV downloads
    const { count: cvDownloads } = await supabase
      .from('cv_downloads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sinceISO)

    // Top pages
    const { data: pagesData } = await supabase
      .from('page_visits')
      .select('page')
      .gte('created_at', sinceISO)

    const pageCount = (pagesData || []).reduce(
      (acc: Record<string, number>, r) => {
        acc[r.page] = (acc[r.page] || 0) + 1
        return acc
      },
      {}
    )
    const topPages = Object.entries(pageCount)
      .map(([page, visits]) => ({ page, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10)

    // Visits by day
    const { data: dailyData } = await supabase
      .from('page_visits')
      .select('created_at')
      .gte('created_at', sinceISO)
      .order('created_at', { ascending: true })

    const dailyCount = (dailyData || []).reduce(
      (acc: Record<string, number>, r) => {
        const date = r.created_at.split('T')[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      },
      {}
    )
    const visitsByDay = Object.entries(dailyCount).map(([date, visits]) => ({
      date,
      visits,
    }))

    // Visits by country
    const { data: countryData } = await supabase
      .from('page_visits')
      .select('ip_country')
      .gte('created_at', sinceISO)
      .not('ip_country', 'is', null)

    const countryCount = (countryData || []).reduce(
      (acc: Record<string, number>, r) => {
        const country = r.ip_country || 'Unknown'
        acc[country] = (acc[country] || 0) + 1
        return acc
      },
      {}
    )
    const visitsByCountry = Object.entries(countryCount)
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 20)

    return NextResponse.json({
      success: true,
      data: {
        total_visits: totalVisits || 0,
        unique_visitors: uniqueVisitors,
        avg_duration_seconds: avgDuration,
        cv_downloads: cvDownloads || 0,
        top_pages: topPages,
        visits_by_day: visitsByDay,
        visits_by_country: visitsByCountry,
      },
    })
  } catch (error) {
    console.error('[Analytics Summary]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
