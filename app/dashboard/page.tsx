import Link from 'next/link'
import { redirect } from 'next/navigation'
import { COURSE_WEEKS } from '@/lib/course/structure'
import { createServerClient } from '@/lib/supabase/server'
import { getUserProgress } from '@/lib/progress'
import {
  getCompletedProgressKeys,
  getCurrentUnlockedWeek,
  getNextCourseAction,
  getWeekCompletionSummary,
  getWeekStatus,
} from '@/lib/course/progression'

export default async function DashboardPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: progressRows } = await getUserProgress(user.id)
  const completedKeys = getCompletedProgressKeys(progressRows ?? [])
  const currentWeek = getCurrentUnlockedWeek(completedKeys)
  const nextAction = getNextCourseAction(completedKeys)
  const totals = {
    lesson: COURSE_WEEKS.flatMap((week) => week.items).filter(
      (item) => item.available && item.kind === 'lesson'
    ).length,
    quiz: COURSE_WEEKS.flatMap((week) => week.items).filter(
      (item) => item.available && item.kind === 'quiz'
    ).length,
    project: COURSE_WEEKS.flatMap((week) => week.items).filter(
      (item) => item.available && item.kind === 'project'
    ).length,
  }
  const lessonCount = progressRows?.filter((item) => item.completed && item.item_type === 'lesson').length ?? 0
  const quizCount = progressRows?.filter((item) => item.completed && item.item_type === 'quiz').length ?? 0
  const projectCount = progressRows?.filter((item) => item.completed && item.item_type === 'project').length ?? 0

  const stats = [
    { label: 'Current unlocked week', value: `Week ${currentWeek}`, tone: 'text-blue-200' },
    { label: 'Lessons completed', value: `${lessonCount} / ${totals.lesson}`, tone: 'text-cyan-200' },
    { label: 'Projects completed', value: `${projectCount} / ${totals.project}`, tone: 'text-violet-200' },
    { label: 'Quizzes completed', value: `${quizCount} / ${totals.quiz}`, tone: 'text-emerald-200' },
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
              <span className="hidden text-sm font-medium text-white/70 sm:inline">
                {user.email ?? 'Learner'}
              </span>
              <form action="/auth/sign-out" method="post" className="contents">
                <button
                  type="submit"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  Sign out
                </button>
              </form>
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
                Next step
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Week {nextAction.week} - {nextAction.weekTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70">
                Continue learning: {nextAction.title}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={nextAction.href}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
              >
                Continue learning
              </Link>
              <Link
                href={`/course/week-${nextAction.week}`}
                className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Week {nextAction.week}
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
            {COURSE_WEEKS.map((week) => {
              const status = getWeekStatus(week.week, completedKeys)
              const summary = getWeekCompletionSummary(week.week, completedKeys)
              const isLocked = status === 'Locked'
              const content = (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                      <span className="text-sm font-black text-blue-200">
                        {String(week.week).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">{week.title}</h3>
                      <p className="mt-0.5 text-xs font-medium text-white/70">
                        {summary.completed} / {summary.total} completed
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${
                      status === 'Completed'
                        ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-200'
                        : status === 'Locked'
                          ? 'border-white/10 bg-white/[0.04] text-white/70'
                          : status === 'Preview'
                            ? 'border-cyan-300/25 bg-cyan-500/10 text-cyan-100'
                            : 'border-blue-300/25 bg-blue-500/10 text-blue-100'
                    }`}
                  >
                    {status}
                  </span>
                </>
              )

              if (!isLocked) {
                return (
                  <Link
                    key={week.week}
                    href={week.overviewHref}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-blue-400/30 hover:bg-white/[0.07]"
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <div
                  key={week.week}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 opacity-75"
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
            {COURSE_WEEKS.map((week) => {
              const project = week.items.find((item) => item.kind === 'project')
              const status = getWeekStatus(week.week, completedKeys)
              const isLocked = status === 'Locked'

              if (!project) return null

              const card = (
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
                    Week {week.week}
                  </p>
                  <h3 className="mt-3 text-xl font-black tracking-tight text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {isLocked ? `Complete Week ${week.week - 1} to unlock this project.` : 'Project access follows your course progression.'}
                  </p>
                  <p className="mt-4 text-sm font-black text-cyan-200 transition group-hover:text-white">
                    {isLocked ? 'Locked' : 'Open project'}
                  </p>
                </div>
              )

              if (project.href && !isLocked) {
                return (
                  <Link
                    key={project.href}
                    href={project.href}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.07]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-0 transition group-hover:opacity-100" />
                    {card}
                  </Link>
                )
              }

              return (
                <article
                  key={`${week.week}-${project.title}`}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 opacity-75"
                >
                  {card}
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
