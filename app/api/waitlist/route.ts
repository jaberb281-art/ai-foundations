import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'

const waitlistSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default('website'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = waitlistSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const { email, source } = parsed.data

    const hasSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!hasSupabase) {
      return NextResponse.json({
        ok: true,
        message: 'You are on the founding waitlist.',
      })
    }

    const supabase = createAdminClient()

    const { error } = await supabase
      .from('waitlist_signups')
      .upsert(
        {
          email: email.toLowerCase(),
          source,
          status: 'subscribed',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      )

    if (error) {
      console.error('Waitlist signup failed.')
      return NextResponse.json(
        { ok: false, message: 'Could not join the waitlist. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, message: 'You are on the founding waitlist.' })
  } catch {
    console.error('Waitlist route failed.')
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
