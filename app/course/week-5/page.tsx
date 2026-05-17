import Link from 'next/link'
import VideoLessonCard from '@/components/VideoLessonCard'

const lessons = [
  {
    title: 'Choosing Your Final Project',
    description: 'Choose a focused project that shows what you learned without becoming too broad.',
  },
  {
    title: 'Building the Project Story',
    description: 'Turn your process into a clear story about the problem, workflow, output, and result.',
  },
  {
    title: 'Presenting Your AI Work',
    description: 'Learn how to explain your AI project in a way that feels useful and credible.',
  },
]

export default function WeekFivePage() {
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
                Week 5 Preview
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                Week 5 - Final AI Project
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                Learners will combine everything they learned into one final AI-powered project they can present, improve, and add to their portfolio.
              </p>
            </div>

            <VideoLessonCard
              title="Week 5 Video Lesson"
              description="A final walkthrough on turning your AI skills into a clear project presentation and portfolio-ready case study."
              duration="22 min"
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
            <Link href="/course/week-5/project" className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500">
              Open Project
            </Link>
          </div>
        </div>

        <div className="grid gap-5">
          <Link href="/course/week-5/project" className="group relative overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-[#0d1220] p-6 transition hover:border-cyan-300/40">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-80" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Project</p>
              <h2 className="mt-4 text-2xl font-black tracking-tight">Create Your Final AI Portfolio Project</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Build a portfolio-ready case study that explains your AI project and process.
              </p>
              <p className="mt-5 text-sm font-black text-cyan-200 transition group-hover:text-white">Open project</p>
            </div>
          </Link>

          <div className="rounded-[1.75rem] border border-violet-300/20 bg-[#0b0f1a] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">Final reflection</p>
            <h2 className="mt-4 text-xl font-black">Coming soon</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              A final reflection prompt will be added when the Week 5 lessons are written.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
