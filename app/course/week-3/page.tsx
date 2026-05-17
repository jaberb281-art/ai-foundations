import Link from 'next/link'
import VideoLessonCard from '@/components/VideoLessonCard'

const lessons = [
  {
    title: 'Choosing the Right AI Tool',
    href: '/course/week-3/choosing-the-right-ai-tool',
    description: 'Learn how to match AI tools to the kind of work you actually need to do.',
  },
  {
    title: 'Building Simple AI Workflows',
    href: '/course/week-3/building-simple-ai-workflows',
    description: 'Understand how to combine research, structure, drafting, and review into a repeatable flow.',
  },
  {
    title: 'Turning AI Output Into Real Work',
    href: '/course/week-3/turning-ai-output-into-real-work',
    description: 'Practice turning rough AI output into something useful, specific, and human-reviewed.',
  },
]

export default function WeekThreePage() {
  return (
    <main className="min-h-screen bg-[#07090f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-[-10rem] top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <Link href="/course" className="text-sm font-semibold text-blue-200 transition hover:text-white">
            Back to course
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                Week 3
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                Week 3 - AI Tools & Workflows
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                Learners will understand how to choose the right AI tools, combine them into simple workflows, and turn AI output into useful real-world results.
              </p>
            </div>

            <VideoLessonCard
              title="Week 3 Video Lesson"
              description="A practical walkthrough of how to use AI tools together for research, writing, planning, and content creation."
              duration="18 min"
              status="coming-soon"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-12 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Lessons</p>
          <div className="mt-5 grid gap-3">
            {lessons.map((lesson) => (
              <Link
                key={lesson.href}
                href={lesson.href}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-blue-400/35 hover:bg-white/[0.07]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-black">{lesson.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/65">{lesson.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-100">
                    Available
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/course"
              className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Back to Course
            </Link>
            <Link
              href="/course/week-3/project"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
            >
              Open Project
            </Link>
            <Link
              href="/course/week-3/quiz"
              className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 px-5 py-3 text-center text-sm font-bold text-cyan-100 transition hover:bg-cyan-500/15"
            >
              Take Self-Check
            </Link>
          </div>
        </div>

        <div className="grid gap-5">
          <Link
            href="/course/week-3/project"
            className="group relative overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-[#0d1220] p-6 transition hover:border-cyan-300/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-80" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Project</p>
              <h2 className="mt-4 text-2xl font-black tracking-tight">
                Build Your First AI Content Workflow
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Turn one idea into a useful content draft with a simple repeatable AI workflow.
              </p>
              <p className="mt-5 text-sm font-black text-cyan-200 transition group-hover:text-white">
                Open project
              </p>
            </div>
          </Link>

          <Link
            href="/course/week-3/quiz"
            className="group rounded-[1.75rem] border border-violet-300/20 bg-[#0b0f1a] p-6 transition hover:border-violet-300/40"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
              Self-check quiz
            </p>
            <h2 className="mt-4 text-xl font-black">Week 3 Self-Check</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Review 8 beginner questions before building your content workflow.
            </p>
            <p className="mt-5 text-sm font-black text-violet-200 transition group-hover:text-white">
              Take quiz
            </p>
          </Link>
        </div>
      </section>
    </main>
  )
}
