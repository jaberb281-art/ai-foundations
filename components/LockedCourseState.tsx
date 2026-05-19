import Link from 'next/link'

type LockedCourseStateProps = {
  week: number
  title?: string
  className?: string
}

export default function LockedCourseState({
  week,
  title = `Week ${week} is locked`,
  className = '',
}: LockedCourseStateProps) {
  const previousWeek = Math.max(1, week - 1)

  return (
    <main className={`min-h-screen bg-[#07090f] text-white ${className}`}>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-16">
          <Link href="/course" className="text-sm font-semibold text-blue-200 transition hover:text-white">
            Back to course
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Locked
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Complete Week {previousWeek} first to unlock this week.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/course/week-${previousWeek}`}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
              >
                Complete Week {previousWeek}
              </Link>
              <Link
                href="/dashboard"
                className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
