'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const weeks = [
  { week: 1, title: 'AI Fundamentals & Python Refresher', status: 'Start', href: '/course/week-1/what-is-ai' },
  { week: 2, title: 'Data Handling & Visualization', status: 'Locked', href: '#' },
  { week: 3, title: 'Supervised Learning', status: 'Locked', href: '#' },
  { week: 4, title: 'Neural Networks & Deep Learning', status: 'Locked', href: '#' },
  { week: 5, title: 'Capstone Project', status: 'Locked', href: '#' },
]

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // onAuthStateChange fires immediately with the current session
    // state — this is more reliable than a one-shot getUser() call
    // because it waits for the client to fully hydrate the session
    // from cookies before deciding if the user is logged in.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'INITIAL_SESSION') {
          if (!session) {
            // No session after hydration — genuinely not logged in
            router.replace('/login')
          } else {
            setUserEmail(session.user.email ?? 'Learner')
            setLoading(false)
          }
        }

        if (event === 'SIGNED_OUT') {
          router.replace('/login')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    // onAuthStateChange will fire SIGNED_OUT and handle the redirect
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] p-6 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
              <span className="text-sm font-bold text-white">AI</span>
            </div>
            <span className="text-lg font-semibold text-white">Foundations</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-400 sm:inline">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Learner Dashboard
          </p>
          <h1 className="mb-2 text-3xl font-bold text-white">Welcome back 👋</h1>
          <p className="text-gray-400">
            Continue your AI learning journey. Week 1 preview is ready.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Weeks', value: '5', icon: '📅' },
            { label: 'Projects', value: '4', icon: '🛠️' },
            { label: 'Completed', value: '0%', icon: '✅' },
            { label: 'Streak', value: '0 days', icon: '🔥' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[var(--bg-overlay)] p-5"
            >
              <div className="mb-2 text-2xl">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-lg font-semibold text-white">Course Curriculum</h2>
        <div className="flex flex-col gap-3">
          {weeks.map((w) => {
            const isStart = w.status === 'Start'
            const Wrapper = isStart ? Link : 'div'
            return (
              <Wrapper
                key={w.week}
                href={isStart ? w.href : (undefined as never)}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[var(--bg-overlay)] p-5 transition hover:border-blue-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-600/20 bg-blue-600/10">
                    <span className="text-sm font-bold text-blue-400">0{w.week}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{w.title}</div>
                    <div className="mt-0.5 text-xs text-gray-500">Week {w.week}</div>
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${isStart
                      ? 'border-blue-600/20 bg-blue-600/10 text-blue-400'
                      : 'border-white/10 bg-white/5 text-gray-500'
                    }`}
                >
                  {w.status}
                </span>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </div>
  )
}