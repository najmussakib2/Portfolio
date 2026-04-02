import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}

// Admin client — bypasses RLS, use only in trusted server-side code
export function createAdminClient() {
  const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service_role_key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabase_url || !service_role_key) {
    throw new Error('Missing Supabase environment variables')
  }
  return createSupabaseClient(
    supabase_url,
    service_role_key,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
