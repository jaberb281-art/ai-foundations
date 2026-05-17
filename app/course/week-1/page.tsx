import Link from 'next/link'
import VideoLessonCard from '@/components/VideoLessonCard'

const lessons = [
  {
    title: 'What is AI?',
    href: '/course/week-1/what-is-ai',
    description: 'Build the basic vocabulary for AI, machine learning, and deep learning.',
  },
  {
    title: 'How AI Learns',
    href: '/course/week-1/how-ai-learns',
    description: 'See how AI learns patterns from examples and why data quality matters.',
  },
  {
    title: 'AI vs Human Thinking',
    href: '/course/week-1/ai-vs-human-thinking',
    description: 'Understand the difference between human understanding and AI prediction.',
  },
]

export default function WeekOnePage() {
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
                Week 1
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                Week 1 — AI Foundations
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                This week helps you understand what AI is, where it is used, and how to think with AI tools before you start building larger projects.
              </p>
            </div>

            <VideoLessonCard
              title="Week 1 Video Lesson"
              description="A guided walkthrough of AI foundations, how AI learns, and how to think critically while using AI tools."
              duration="12 min"
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
                <h2 className="text-lg font-black">{lesson.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{lesson.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/course/week-1/what-is-ai"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
            >
              Start Lesson
            </Link>
            <Link
              href="/course/week-1/project"
              className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Open Project
            </Link>
            <Link
              href="/course/week-1/quiz"
              className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 px-5 py-3 text-center text-sm font-bold text-cyan-100 transition hover:bg-cyan-500/15"
            >
              Take Self-Check
            </Link>
          </div>
        </div>

        <div className="grid gap-5">
          <Link
            href="/course/week-1/project"
            className="group relative overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-[#0d1220] p-6 transition hover:border-cyan-300/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-80" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Project</p>
              <h2 className="mt-4 text-2xl font-black tracking-tight">
                Build Your First AI Study Assistant
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Create a reusable assistant prompt that explains topics, quizzes you, corrects mistakes, and plans your next study step.
              </p>
              <p className="mt-5 text-sm font-black text-cyan-200 transition group-hover:text-white">
                Open project
              </p>
            </div>
          </Link>

          <Link
            href="/course/week-1/quiz"
            className="group rounded-[1.75rem] border border-violet-300/20 bg-[#0b0f1a] p-6 transition hover:border-violet-300/40"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
              Self-check quiz
            </p>
            <h2 className="mt-4 text-xl font-black">Week 1 Self-Check</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Review 8 beginner questions before moving into the project.
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
