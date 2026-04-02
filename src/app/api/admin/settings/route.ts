import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

// GET — fetch portfolio settings (public, used by frontend)
export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('portfolio_settings')
      .select('*')
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[Settings GET]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// PATCH — update portfolio settings (admin only)
export async function PATCH(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const updates = await request.json()
    const supabase = createAdminClient()

    // Prevent updating id or created_at
    delete updates.id
    delete updates.created_at

    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('portfolio_settings')
      .update(updates)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[Settings PATCH]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
