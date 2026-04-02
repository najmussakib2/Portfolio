import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('visible', true)
      .order('order_index', { ascending: true })

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const body = await request.json()
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('testimonials')
      .insert(body)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { id, ...updates } = await request.json()
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const supabase = createAdminClient()
    const { error } = await supabase.from('testimonials').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
