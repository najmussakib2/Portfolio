import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { contactEmailHtml, autoReplyHtml, sendEmailToAdmin, sendEmail } from '@/lib/resend/client'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, adminEmail } = body
    console.log({body});
    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message is too short' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Save to database
    const { error: dbError } = await supabase.from('contact_messages').insert({
      name,
      email,
      subject,
      message,
    })

    if (dbError) {
      console.log({dbError});
      throw dbError
    }

    sendEmailToAdmin({ name, email, adminEmail }, contactEmailHtml({ name, email, subject, message }))
    sendEmail(email, autoReplyHtml({ name }), "Thanks for reaching out — I'll be in touch soon!")
    return NextResponse.json({
      success: true,
      data: null,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('[Contact]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

// GET — fetch all messages (admin only)
export async function GET(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (unreadOnly) query = query.eq('read', false)

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[Contact GET]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// PATCH — mark message as read (admin only)
export async function PATCH(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { id, read } = await request.json()
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('contact_messages')
      .update({ read })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true, data: null })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    )
  }
}
