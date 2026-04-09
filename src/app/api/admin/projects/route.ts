import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

// GET — fetch all projects (public)
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featuredOnly = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '1000')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) query = query.eq('category', category)
    if (featuredOnly) query = query.eq('featured', true)

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[Projects GET]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST — create project (admin only)
export async function POST(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const body = await request.json()
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('projects')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('[Projects POST]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

// PATCH — update project (admin only)
export async function PATCH(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing project id' },
        { status: 400 }
      )
    }

    updates.updated_at = new Date().toISOString()
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[Projects PATCH]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE — delete project (admin only)
export async function DELETE(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing project id' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('[Projects DELETE]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
