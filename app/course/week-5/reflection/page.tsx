import Link from 'next/link'
import WeekFiveReflection from '@/components/WeekFiveReflection'
import CompleteButton from '@/components/CompleteButton'
import UnlockedWeekGate from '@/components/UnlockedWeekGate'

export default function WeekFiveReflectionPage() {
  return (
    <UnlockedWeekGate week={5}>
      <main className="min-h-screen bg-[#07090f] text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-5 py-16">
            <Link href="/course/week-5" className="text-sm font-semibold text-blue-200 transition hover:text-white">
              Back to Week 5
            </Link>

            <div className="mt-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                Reflection
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                Week 5 Final Reflection
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70">
                Review your final AI project and prepare it as a portfolio-ready case study.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12">
          <WeekFiveReflection />

          <div className="mt-6 flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 sm:flex-row">
            <CompleteButton
              itemType="quiz"
              week="week-5"
              slug="final-reflection"
              label="Mark reflection complete"
            />
            <Link
              href="/course/week-5/project"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
            >
              Open Final Project
            </Link>
            <Link
              href="/course/week-5"
              className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Back to Week 5
            </Link>
          </div>
        </section>
      </main>
    </UnlockedWeekGate>
  )
}
