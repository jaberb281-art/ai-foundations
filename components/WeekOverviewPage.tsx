import Link from 'next/link'
import VideoLessonCard from '@/components/VideoLessonCard'
import {
  CourseItem,
  CourseWeek,
  getCourseItemProgressSlug,
  getProgressKey,
} from '@/lib/course/structure'
import { getAuthenticatedUserProgress } from '@/lib/progress'
import { WeekOverview } from '@/lib/course/week-overviews'

type WeekOverviewPageProps = {
  courseWeek: CourseWeek
  overview: WeekOverview
}

function CheckIcon() {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/15 text-xs font-black text-emerald-100"
      aria-label="Completed"
    >
      ✓
    </span>
  )
}

function StatusPill({
  completed,
  label,
  preview,
}: {
  completed?: boolean
  label: string
  preview?: boolean
}) {
  if (completed) {
    return (
      <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-100">
        Completed
      </span>
    )
  }

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-black ${
        preview
          ? 'border-violet-300/25 bg-violet-500/10 text-violet-100'
          : 'border-cyan-300/25 bg-cyan-500/10 text-cyan-100'
      }`}
    >
      {label}
    </span>
  )
}

function isCompleted(item: CourseItem, weekSlug: string, completedKeys: string[]) {
  const progressSlug = getCourseItemProgressSlug(item)
  return Boolean(
    progressSlug && completedKeys.includes(getProgressKey(item.kind, weekSlug, progressSlug))
  )
}

function LessonCard({
  item,
  description,
  index,
  completed,
}: {
  item: CourseItem
  description: string
  index: number
  completed: boolean
}) {
  const content = (
    <>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-500/10 text-sm font-black text-blue-100">
          {completed ? <CheckIcon /> : String(index + 1).padStart(2, '0')}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="text-lg font-black tracking-tight text-white">{item.title}</h3>
            <StatusPill
              completed={completed}
              label={item.available ? 'Available' : 'Coming soon'}
              preview={!item.available}
            />
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>
      </div>
    </>
  )

  if (item.href && item.available) {
    return (
      <Link
        href={item.href}
        className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:border-blue-300/35 hover:bg-blue-500/[0.075]"
      >
        {content}
      </Link>
    )
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      {content}
    </article>
  )
}

function ActionCard({
  tone,
  eyebrow,
  title,
  description,
  href,
  completed,
  disabledLabel,
}: {
  tone: 'cyan' | 'violet'
  eyebrow: string
  title: string
  description: string
  href?: string
  completed?: boolean
  disabledLabel?: string
}) {
  const toneClasses =
    tone === 'cyan'
      ? 'border-cyan-300/20 from-blue-500/12 to-cyan-400/10 text-cyan-200 hover:border-cyan-300/40'
      : 'border-violet-300/20 from-violet-500/12 to-blue-500/10 text-violet-200 hover:border-violet-300/40'

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-br opacity-80" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <p className={`text-sm font-black uppercase tracking-[0.18em] ${tone === 'cyan' ? 'text-cyan-300' : 'text-violet-300'}`}>
            {eyebrow}
          </p>
          {completed ? <CheckIcon /> : disabledLabel ? <StatusPill label={disabledLabel} preview /> : null}
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
        <p className={`mt-5 text-sm font-black transition ${tone === 'cyan' ? 'text-cyan-200' : 'text-violet-200'}`}>
          {href ? (completed ? 'Review again' : 'Open') : disabledLabel}
        </p>
      </div>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={`group relative overflow-hidden rounded-[1.25rem] border bg-[#0d1220] bg-gradient-to-br p-6 transition ${toneClasses}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <article className={`relative overflow-hidden rounded-[1.25rem] border bg-[#0b0f1a] bg-gradient-to-br p-6 ${toneClasses}`}>
      {content}
    </article>
  )
}

export default async function WeekOverviewPage({
  courseWeek,
  overview,
}: WeekOverviewPageProps) {
  const { data: progressRows } = await getAuthenticatedUserProgress()
  const weekSlug = `week-${courseWeek.week}`
  const completedKeys = progressRows
    .filter((progress) => progress.completed)
    .map((progress) => getProgressKey(progress.item_type, progress.week, progress.slug))

  const lessons = courseWeek.items.filter((item) => item.kind === 'lesson')
  const quiz = courseWeek.items.find((item) => item.kind === 'quiz')
  const project = courseWeek.items.find((item) => item.kind === 'project')
  const firstIncompleteLesson = lessons.find((item) => item.available && !isCompleted(item, weekSlug, completedKeys))
  const startHref =
    firstIncompleteLesson?.href ?? quiz?.href ?? project?.href ?? courseWeek.overviewHref
  const startLabel = courseWeek.week <= 3 ? 'Start or continue' : 'Open project'

  const completedCount = courseWeek.items.filter((item) =>
    isCompleted(item, weekSlug, completedKeys)
  ).length
  const availableCount = courseWeek.items.filter((item) => item.available).length

  return (
    <main className="min-h-screen bg-[#07090f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_28rem),radial-gradient(circle_at_85%_8rem,rgba(124,58,237,0.14),transparent_24rem)]">
        <div className="relative mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <Link href="/course" className="text-sm font-bold text-blue-200 transition hover:text-white">
            Back to course
          </Link>

          <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                  {overview.label}
                </p>
                <StatusPill label={overview.status} preview={overview.status === 'Preview'} />
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                {overview.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                {overview.description}
              </p>
              <div className="mt-6 rounded-2xl border border-blue-300/15 bg-blue-500/10 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">
                  Learning outcome
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{overview.outcome}</p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={startHref}
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  {startLabel}
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Dashboard
                </Link>
              </div>
            </div>

            <VideoLessonCard
              title={overview.video.title}
              description={overview.video.description}
              duration={overview.video.duration}
              status="coming-soon"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="rounded-[1.25rem] border border-white/10 bg-[#0d1220] p-6 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                Lessons
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">Module path</h2>
            </div>
            <p className="text-sm font-bold text-slate-300">
              {completedCount} / {availableCount} completed
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            {lessons.map((item, index) => (
              <LessonCard
                key={item.title}
                item={item}
                index={index}
                description={overview.lessons[item.slug ?? ''] ?? 'Lesson details coming soon.'}
                completed={isCompleted(item, weekSlug, completedKeys)}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {quiz ? (
            <ActionCard
              tone="violet"
              eyebrow="Self-check"
              title={overview.quiz?.title ?? quiz.title}
              description={overview.quiz?.description ?? 'Review the key ideas from this week.'}
              href={quiz.href}
              completed={isCompleted(quiz, weekSlug, completedKeys)}
            />
          ) : (
            <ActionCard
              tone="violet"
              eyebrow="Self-check"
              title="Not available in preview"
              description="This week does not have a self-check yet. The project is available for early planning."
              disabledLabel="Preview"
            />
          )}

          {project && (
            <ActionCard
              tone="cyan"
              eyebrow={courseWeek.week === 5 ? 'Final project' : 'Project'}
              title={overview.project.title}
              description={overview.project.description}
              href={project.href}
              completed={isCompleted(project, weekSlug, completedKeys)}
            />
          )}
        </div>
      </section>
    </main>
  )
}
