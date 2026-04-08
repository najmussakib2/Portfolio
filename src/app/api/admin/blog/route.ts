import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

// GET — fetch posts (public gets published only, admin gets all)
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const admin = searchParams.get('admin') === 'true'
    const tag = searchParams.get('tag')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Single post by slug
    if (slug) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    // All posts
    let query = supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, tags, published, published_at, created_at')
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Public only sees published posts
    if (!admin) query = query.eq('published', true)

    // Filter by tag
    if (tag) query = query.contains('tags', [tag])

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ success: true, data, count })
  } catch (error) {
    console.error('[Blog GET]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST — create post (admin only)
export async function POST(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const body = await request.json()
    const { title, slug, excerpt, content, cover_image_url, tags, published } = body

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { success: false, error: 'title, slug, excerpt and content are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        excerpt,
        content,
        cover_image_url: cover_image_url || null,
        tags: tags || [],
        published: published || false,
        published_at: published ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'A post with this slug already exists' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('[Blog POST]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

// PATCH — update post (admin only)
export async function PATCH(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { id, published, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing post id' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Get current post to check if published status is changing
    const { data: current } = await supabase
      .from('blog_posts')
      .select('published, published_at')
      .eq('id', id)
      .single()

    // Set published_at when publishing for the first time
    const published_at =
      published && !current?.published_at
        ? new Date().toISOString()
        : current?.published_at || null

    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, published, published_at })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[Blog PATCH]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE — delete post (admin only)
export async function DELETE(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing post id' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('[Blog DELETE]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
