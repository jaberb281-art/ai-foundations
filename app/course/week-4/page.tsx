import Link from 'next/link'
import VideoLessonCard from '@/components/VideoLessonCard'

const lessons = [
  {
    title: 'Finding a Problem Worth Solving',
    description: 'Learn how to spot real user problems before jumping into AI features.',
  },
  {
    title: 'Designing an AI Feature',
    description: 'Understand what the user gives the AI, what the AI returns, and why it helps.',
  },
  {
    title: 'Planning a Simple AI Product',
    description: 'Shape a small product idea into a clear first version that could actually be built.',
  },
]

export default function WeekFourPage() {
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
                Week 4 Preview
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                Week 4 - Building With AI
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                Learners will understand how to turn an idea into a simple AI-powered product concept, define the user problem, and design the first version.
              </p>
            </div>

            <VideoLessonCard
              title="Week 4 Video Lesson"
              description="A practical walkthrough of how to think like an AI product builder and shape an idea into a simple product plan."
              duration="20 min"
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
              <article key={lesson.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-black">{lesson.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/65">{lesson.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-white/70">
                    Coming soon
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/course" className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10">
              Back to Course
            </Link>
            <Link href="/course/week-4/project" className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500">
              Open Project
            </Link>
          </div>
        </div>

        <div className="grid gap-5">
          <Link href="/course/week-4/project" className="group relative overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-[#0d1220] p-6 transition hover:border-cyan-300/40">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-80" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Project</p>
              <h2 className="mt-4 text-2xl font-black tracking-tight">Build Your First AI Mini Product Plan</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Create a simple AI product plan for one real user problem.
              </p>
              <p className="mt-5 text-sm font-black text-cyan-200 transition group-hover:text-white">Open project</p>
            </div>
          </Link>

          <div className="rounded-[1.75rem] border border-violet-300/20 bg-[#0b0f1a] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">Self-check quiz</p>
            <h2 className="mt-4 text-xl font-black">Coming soon</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              A short AI product planning self-check will be added when the Week 4 lessons are written.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
