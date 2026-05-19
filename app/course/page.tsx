import Link from 'next/link'
import type { Metadata } from 'next'
import { COURSE_WEEKS } from '@/lib/course/structure'
import { getAuthenticatedUserProgress } from '@/lib/progress'
import {
  getCompletedProgressKeys,
  getNextRequiredItem,
  getWeekCompletionSummary,
  getWeekStatus,
} from '@/lib/course/progression'

export const metadata: Metadata = {
  title: 'AI Foundations Course | Theory Of You Academy',
  description:
    'Continue the 5-week AI Foundations course with lessons, self-checks, projects, and locked progression.',
}

function getWeekText(week: number) {
  const descriptions: Record<number, string> = {
    1: '3 lessons + 1 project + quiz on what AI is, how it learns, and how to think clearly with AI tools.',
    2: '3 lessons + 1 project + quiz on clear instructions, prompt structure, and common prompting mistakes.',
    3: '3 lessons + 1 project + quiz on choosing tools, building workflows, and improving AI output.',
    4: 'Turn ideas into simple AI-powered product plans.',
    5: 'Create a portfolio-ready AI project case study.',
  }

  return descriptions[week] ?? 'Continue your AI Foundations learning path.'
}

export default async function CoursePage() {
  const { data: progressRows } = await getAuthenticatedUserProgress()
  const completedKeys = getCompletedProgressKeys(progressRows)

  return (
    <main className="min-h-screen bg-[#07090f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-28 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Link href="/dashboard" className="text-sm font-semibold text-blue-200 transition hover:text-white">
            Back to dashboard
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Course
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
              AI Foundations
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Learn how AI works, how to use it, and how to build real projects with it.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/course/week-1"
              className="rounded-2xl bg-blue-600 px-6 py-4 text-center text-sm font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
            >
              Continue learning
            </Link>
            <Link
              href="/course/week-1/what-is-ai"
              className="rounded-2xl border border-white/15 bg-white/[0.05] px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Open first lesson
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-5">
          {COURSE_WEEKS.map((week) => {
            const status = getWeekStatus(week.week, completedKeys)
            const summary = getWeekCompletionSummary(week.week, completedKeys)
            const nextItem = getNextRequiredItem(week.week, completedKeys)
            const isLocked = status === 'Locked'
            const href = isLocked ? undefined : week.overviewHref
            const cta =
              status === 'Completed'
                ? 'Review completed week'
                : status === 'Locked'
                  ? `Complete Week ${week.week - 1} first`
                  : nextItem
                    ? week.week === 1 && summary.completed === 0
                      ? 'Start'
                      : 'Continue'
                    : 'Open preview'

            return (
              <article
                key={week.week}
                className={`relative overflow-hidden rounded-[1.75rem] border p-6 ${
                  isLocked
                    ? 'border-white/10 bg-[#0b0f1a] opacity-75'
                    : 'border-blue-400/30 bg-[#0d1220] shadow-2xl shadow-blue-950/25'
                }`}
              >
                {!isLocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10" />
                )}
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-blue-200">
                      WEEK {String(week.week).padStart(2, '0')}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        status === 'Completed'
                          ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-200'
                          : status === 'Locked'
                            ? 'border-white/10 bg-white/[0.04] text-white/65'
                            : status === 'Preview'
                              ? 'border-cyan-300/25 bg-cyan-500/10 text-cyan-100'
                              : 'border-blue-300/25 bg-blue-500/10 text-blue-100'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-black tracking-tight">{week.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/65">{getWeekText(week.week)}</p>
                  <p className="mt-4 text-sm font-bold text-white/70">
                    {summary.completed} / {summary.total} completed
                  </p>

                  <div className="mt-6 flex flex-col gap-2">
                    {href ? (
                      <Link className="text-sm font-bold text-cyan-200 transition hover:text-white" href={href}>
                        {cta}
                      </Link>
                    ) : (
                      <p className="text-sm font-bold text-white/45">{cta}</p>
                    )}

                    {!isLocked && nextItem && (
                      <Link className="text-sm font-bold text-cyan-200 transition hover:text-white" href={nextItem.href}>
                        Next step: {nextItem.title}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
