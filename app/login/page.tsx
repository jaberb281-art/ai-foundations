'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Sparkles, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!isConfigured) {
      setError('Supabase auth is not configured yet.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) setError(error.message)
    else setSent(true)

    setLoading(false)
  }

  const handleOAuth = async (provider: 'google' | 'github') => {
    if (!isConfigured) {
      setError('Supabase auth is not configured yet.')
      return
    }

    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070a12] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-blue-200/20"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${(i * 13) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animation: `floatParticle ${7 + (i % 6)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <Link href="/" className="group mb-7 inline-flex items-center gap-3">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/[0.04] shadow-[0_0_35px_rgba(34,211,238,0.16)]">
              <div className="absolute inset-[-6px] rounded-[1.4rem] border border-cyan-400/20 animate-spin-slow" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/25 via-purple-500/15 to-cyan-400/20 blur-sm" />
              <Image
                src="/logo.png"
                alt="Theory Of You Academy"
                width={40}
                height={40}
                className="relative z-10 object-contain"
                priority
              />
            </div>

            <div className="text-left">
              <p className="text-lg font-black text-white">Theory Of You</p>
              <p className="text-xs font-medium text-white/45">AI Foundations</p>
            </div>
          </Link>
          <div className="absolute left-1/2 top-24 h-24 w-48 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <h1 className="text-[3.5rem] leading-[0.95] font-black tracking-[-0.04em] text-white sm:text-[4.5rem]">
            Welcome back
          </h1>

          <p className="mt-2 text-base leading-7 text-white/50">
            Sign in to access your AI Foundations dashboard.
          </p>
        </div>

        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-blue-400/25 hover:shadow-[0_25px_90px_rgba(37,99,235,0.25)]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

          <div className="relative z-10">
            {sent ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-500/10">
                  <Mail className="h-7 w-7 text-emerald-300" />
                </div>

                <h2 className="text-xl font-black text-white">Check your email</h2>

                <p className="mt-3 text-sm leading-6 text-white/55">
                  We sent a magic link to{' '}
                  <strong className="text-white">{email}</strong>. Click it to sign in.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => handleOAuth('google')}
                    className="group/google relative min-h-14 overflow-hidden rounded-2xl bg-white px-4 text-sm font-black text-[#050711] transition hover:scale-[1.02]"
                  >
                    <span className="relative z-10">Continue with Google</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-200/70 to-transparent transition duration-700 group-hover/google:translate-x-full" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuth('github')}
                    className="group/github flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-black text-white transition hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <span className="text-lg transition group-hover/github:rotate-12">⌘</span>
                    Continue with GitHub
                  </button>
                </div>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-white/35">or continue with email</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="min-h-14 w-full rounded-2xl border border-white/10 bg-[#080a12] px-11 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-400"
                    />
                  </div>

                  {error && <p className="text-xs text-red-300">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="min-h-14 rounded-2xl bg-blue-600 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:scale-[1.02] hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send Magic Link'}
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/45 backdrop-blur">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-300/70" />
                    Secure authentication powered by Supabase
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatParticle {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.2;
          }

          50% {
            transform: translateY(-18px);
            opacity: 0.7;
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </main>
  )
}