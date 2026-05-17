import Link from 'next/link'

const weeks = [
  {
    week: '01',
    title: 'AI Foundations',
    text: '3 lessons + 1 project + quiz on what AI is, how it learns, and how to think clearly with AI tools.',
    status: 'Active',
    available: true,
    overviewHref: '/course/week-1',
    lessonHref: '/course/week-1/what-is-ai',
    projectHref: '/course/week-1/project',
    quizHref: '/course/week-1/quiz',
  },
  {
    week: '02',
    title: 'Prompt Engineering Basics',
    text: '3 lessons + 1 project + quiz on clear instructions, prompt structure, and common prompting mistakes.',
    status: 'Active',
    available: true,
    overviewHref: '/course/week-2',
    lessonHref: '/course/week-2/what-is-prompting',
    projectHref: '/course/week-2/project',
    quizHref: '/course/week-2/quiz',
  },
  {
    week: '03',
    title: 'AI Tools & Workflows',
    text: '3 lessons + 1 project + quiz on choosing tools, building workflows, and improving AI output.',
    status: 'Active',
    available: true,
    overviewHref: '/course/week-3',
    lessonHref: '/course/week-3/choosing-the-right-ai-tool',
    projectHref: '/course/week-3/project',
    quizHref: '/course/week-3/quiz',
  },
  {
    week: '04',
    title: 'Building With AI',
    text: 'Turn ideas into simple AI-powered product plans.',
    status: 'Preview',
    preview: true,
    overviewHref: '/course/week-4',
    projectHref: '/course/week-4/project',
  },
  {
    week: '05',
    title: 'Final AI Project',
    text: 'Create a portfolio-ready AI project case study.',
    status: 'Preview',
    preview: true,
    overviewHref: '/course/week-5',
    projectHref: '/course/week-5/project',
  },
]

export default function CoursePage() {
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
              Start Week 1
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
          {weeks.map((week) => (
            <article
              key={week.week}
              className={`relative overflow-hidden rounded-[1.75rem] border p-6 ${
                week.available
                  ? 'border-blue-400/30 bg-[#0d1220] shadow-2xl shadow-blue-950/25'
                  : 'border-white/10 bg-[#0b0f1a]'
              }`}
            >
              {week.available && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10" />
              )}
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-black text-blue-200">WEEK {week.week}</span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${
                      week.available
                        ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-200'
                        : 'border-cyan-300/25 bg-cyan-500/10 text-cyan-100'
                    }`}
                  >
                    {week.status}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-black tracking-tight">{week.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/65">{week.text}</p>

                {week.available ? (
                  <div className="mt-6 flex flex-col gap-2">
                    <Link className="text-sm font-bold text-cyan-200 transition hover:text-white" href={week.overviewHref}>
                      Week overview
                    </Link>
                    <Link className="text-sm font-bold text-cyan-200 transition hover:text-white" href={week.lessonHref}>
                      First lesson
                    </Link>
                    <Link className="text-sm font-bold text-cyan-200 transition hover:text-white" href={week.projectHref}>
                      Week project
                    </Link>
                    {week.quizHref && (
                      <Link className="text-sm font-bold text-cyan-200 transition hover:text-white" href={week.quizHref}>
                        Self-check quiz
                      </Link>
                    )}
                  </div>
                ) : week.preview ? (
                  <div className="mt-6 flex flex-col gap-2">
                    <Link className="text-sm font-bold text-cyan-200 transition hover:text-white" href={week.overviewHref}>
                      Week preview
                    </Link>
                    <Link className="text-sm font-bold text-cyan-200 transition hover:text-white" href={week.projectHref}>
                      Open project
                    </Link>
                  </div>
                ) : (
                  <p className="mt-6 text-sm font-semibold text-white/65">Locked for now</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
