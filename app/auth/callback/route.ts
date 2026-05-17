import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { getSupabasePublicConfig } from '@/lib/supabase/env'

/*
  AUTH CALLBACK — handles BOTH auth flows:

  1. Magic link / OTP  → Supabase sends: ?token_hash=...&type=email
  2. OAuth (Google/GitHub) → Supabase sends: ?code=...

  Previously only flow 2 was handled, so every magic link
  click silently fell through to /login with no session set.
*/
export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const origin = requestUrl.origin
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'
    const destination = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard'
    const supabaseConfig = getSupabasePublicConfig()

    if (!supabaseConfig) {
        return NextResponse.redirect(
            `${origin}/login?error=${encodeURIComponent('Supabase auth is not configured yet.')}`
        )
    }

    // Params for magic link flow
    const token_hash = requestUrl.searchParams.get('token_hash')
    const type = requestUrl.searchParams.get('type')

    // Param for OAuth flow
    const code = requestUrl.searchParams.get('code')

    const cookieStore = await cookies()

    const supabase = createServerClient(
        supabaseConfig.url,
        supabaseConfig.anonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options)
                    })
                },
            },
        }
    )

    /* ── Flow 1: Magic link / OTP ─────────────────────────── */
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as 'email' | 'recovery' | 'invite' | 'email_change',
        })

        if (!error) {
            return NextResponse.redirect(`${origin}${destination}`)
        }

        console.error('[auth/callback] verifyOtp error:', error.message)
        return NextResponse.redirect(
            `${origin}/login?error=${encodeURIComponent(error.message)}`
        )
    }

    /* ── Flow 2: OAuth PKCE code exchange ─────────────────── */
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return NextResponse.redirect(`${origin}${destination}`)
        }

        console.error('[auth/callback] exchangeCodeForSession error:', error.message)
        return NextResponse.redirect(
            `${origin}/login?error=${encodeURIComponent(error.message)}`
        )
    }

    // Neither param present — something is wrong
    return NextResponse.redirect(`${origin}/login?error=missing_params`)
}
