'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!isConfigured) {
      setError('Supabase auth is not configured yet. You can still join the waitlist from the homepage.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  const handleOAuth = async (provider: 'google' | 'github') => {
    if (!isConfigured) {
      setError('Supabase auth is not configured yet. Add your Supabase URL and anon key first.')
      return
    }

    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1117] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
              <span className="text-sm font-bold text-white">AI</span>
            </div>
            <span className="text-lg font-semibold text-white">Foundations</span>
          </Link>
          <h1 className="mb-2 text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-gray-400">Sign in to continue your AI learning journey</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1a1d27] p-8">
          {sent ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <span className="text-2xl">📬</span>
              </div>
              <h2 className="mb-2 font-semibold text-white">Check your email</h2>
              <p className="text-sm text-gray-400">
                We sent a magic link to <strong className="text-white">{email}</strong>. Click it to sign in.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-3">
                <button onClick={() => handleOAuth('google')} className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100">
                  Continue with Google
                </button>
                <button onClick={() => handleOAuth('github')} className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#24292e] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2f363d]">
                  Continue with GitHub
                </button>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-gray-500">or continue with email</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-blue-500"
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button type="submit" disabled={loading} className="w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Magic Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">Free forever · No credit card required</p>
      </div>
    </div>
  )
}
