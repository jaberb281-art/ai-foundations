'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const weeks = [
  { week: 1, title: 'AI Foundations', status: 'Active', href: '/course/week-1' },
  { week: 2, title: 'Prompt Engineering Basics', status: 'Active', href: '/course/week-2' },
  { week: 3, title: 'AI Tools & Workflows', status: 'Active', href: '/course/week-3' },
  { week: 4, title: 'Building With AI', status: 'Preview', href: '/course/week-4' },
  { week: 5, title: 'Final AI Project', status: 'Preview', href: '/course/week-5' },
]

const projects = [
  {
    title: 'Build Your First AI Study Assistant',
    href: '/course/week-1/project',
    week: 'Week 1',
    text: 'Create a reusable AI study assistant prompt that explains, quizzes, corrects, and plans.',
  },
  {
    title: 'Build Your First Prompt Pack',
    href: '/course/week-2/project',
    week: 'Week 2',
    text: 'Design a small reusable prompt pack for one real-life use case.',
  },
  {
    title: 'Build Your First AI Content Workflow',
    href: '/course/week-3/project',
    week: 'Week 3',
    text: 'Turn one idea into a useful content draft with a repeatable AI workflow.',
  },
  {
    title: 'Build Your First AI Mini Product Plan',
    href: '/course/week-4/project',
    week: 'Week 4',
    text: 'Shape one user problem into a simple AI-powered product plan.',
  },
  {
    title: 'Create Your Final AI Portfolio Project',
    href: '/course/week-5/project',
    week: 'Week 5',
    text: 'Present your AI work as a clear portfolio-ready case study.',
  },
]

type ProgressCounts = {
  lesson: number
  quiz: number
  project: number
}

type ProgressRow = {
  item_type: keyof ProgressCounts
  completed: boolean
}

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [progressCounts, setProgressCounts] = useState<ProgressCounts>({
    lesson: 0,
    quiz: 0,
    project: 0,
  })
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    async function loadProgress() {
      try {
        const response = await fetch('/api/progress')

        if (!response.ok) return

        const data = (await response.json()) as { progress?: ProgressRow[] }
        const progress = data.progress ?? []

        setProgressCounts({
          lesson: progress.filter((item) => item.completed && item.item_type === 'lesson').length,
          quiz: progress.filter((item) => item.completed && item.item_type === 'quiz').length,
          project: progress.filter((item) => item.completed && item.item_type === 'project').length,
        })
      } catch {
        setProgressCounts({ lesson: 0, quiz: 0, project: 0 })
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        if (!session) {
          router.replace('/login')
        } else {
          setUserEmail(session.user.email ?? 'Learner')
          setLoading(false)
          loadProgress()
        }
      }

      if (event === 'SIGNED_OUT') {
        router.replace('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07090f]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-sm font-medium text-white/70">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Current week', value: 'Week 1', tone: 'text-blue-200' },
    { label: 'Lessons completed', value: `${progressCounts.lesson} / 9`, tone: 'text-cyan-200' },
    { label: 'Projects completed', value: `${progressCounts.project} / 5`, tone: 'text-violet-200' },
    { label: 'Quizzes completed', value: `${progressCounts.quiz} / 3`, tone: 'text-emerald-200' },
  ]

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-[-20rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-blue-600 shadow-[0_0_35px_rgba(37,99,235,0.22)]">
                <span className="text-sm font-black text-white">AI</span>
              </div>
              <div>
                <span className="block text-base font-black text-white">AI Foundations</span>
                <span className="hidden text-xs font-medium text-white/65 sm:block">
                  Theory Of You Academy
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden text-sm font-medium text-white/70 sm:inline">{userEmail}</span>
              <button
                onClick={handleSignOut}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>

          <div className="py-14">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Learner command center
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
              Welcome back
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              Continue your AI Foundations journey.
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-5 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[1.75rem] border border-blue-400/25 bg-[#0d1220] p-6 shadow-2xl shadow-blue-950/25 lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                Continue Learning
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Week 1 - AI Foundations
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70">
                Start or continue: What is AI?
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/course/week-1/what-is-ai"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
              >
                Continue Learning
              </Link>
              <Link
                href="/course/week-1"
                className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Week 1
              </Link>
            </div>
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-[#0b0f1a] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                  {stat.label}
                </p>
                <p className={`mt-3 text-2xl font-black ${stat.tone}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            Course roadmap
          </p>
          <div className="mt-5 grid gap-3">
            {weeks.map((week) => {
              const content = (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                      <span className="text-sm font-black text-blue-200">0{week.week}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">{week.title}</h3>
                      <p className="mt-0.5 text-xs font-medium text-white/70">Week {week.week}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${
                      week.status === 'Active'
                        ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-200'
                        : week.status === 'Preview'
                          ? 'border-cyan-300/25 bg-cyan-500/10 text-cyan-100'
                          : 'border-white/10 bg-white/[0.04] text-white/70'
                    }`}
                  >
                    {week.status}
                  </span>
                </>
              )

              if (week.href) {
                return (
                  <Link
                    key={week.week}
                    href={week.href}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-blue-400/30 hover:bg-white/[0.07]"
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <div
                  key={week.week}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  {content}
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
            Projects
          </p>
          <div className="mt-5 grid gap-4">
            {projects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.07]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
                    {project.week}
                  </p>
                  <h3 className="mt-3 text-xl font-black tracking-tight text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{project.text}</p>
                  <p className="mt-4 text-sm font-black text-cyan-200 transition group-hover:text-white">
                    Open project
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
