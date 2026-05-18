'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { LessonMeta } from '@/lib/mdx/loader'
import {
  CourseItem,
  CourseWeek,
  LessonNavTarget,
  getCourseItemProgressSlug,
  getProgressKey,
} from '@/lib/course/structure'

type LessonShellProps = {
  lesson: LessonMeta
  courseWeek: CourseWeek
  lessonIndex: number
  lessonTotal: number
  previousLesson: LessonNavTarget | null
  nextLesson: LessonNavTarget | null
  completedProgressKeys: string[]
  children: ReactNode
}

const itemLabels: Record<CourseItem['kind'], string> = {
  lesson: 'Lesson',
  quiz: 'Quiz',
  project: 'Project',
}

function CurriculumStatus({
  active,
  completed,
  item,
}: {
  active: boolean
  completed: boolean
  item: CourseItem
}) {
  if (!item.available || item.comingSoon) {
    return <span className="course-status-icon locked" aria-label="Coming soon" />
  }

  if (completed) {
    return (
      <span className="course-status-icon completed" aria-label="Completed">
        <span aria-hidden="true">✓</span>
      </span>
    )
  }

  if (active) {
    return <span className="course-status-icon current" aria-label="Current item" />
  }

  return <span className="course-status-icon available" aria-label="Available" />
}

function CurriculumItem({
  item,
  currentSlug,
  weekSlug,
  completedProgressKeys,
}: {
  item: CourseItem
  currentSlug: string
  weekSlug: string
  completedProgressKeys: string[]
}) {
  const active = item.kind === 'lesson' && item.slug === currentSlug
  const progressSlug = getCourseItemProgressSlug(item)
  const completed = Boolean(
    progressSlug && completedProgressKeys.includes(getProgressKey(item.kind, weekSlug, progressSlug))
  )
  const content = (
    <>
      <CurriculumStatus active={active} completed={completed} item={item} />
      <span className="course-curriculum-copy">
        <span className="course-curriculum-title">{item.title}</span>
        <span className="course-curriculum-meta">
          {item.comingSoon ? 'Coming soon' : completed ? 'Completed' : itemLabels[item.kind]}
        </span>
      </span>
    </>
  )

  if (item.href && item.available) {
    return (
      <Link
        href={item.href}
        className={`course-curriculum-item${active ? ' is-active' : ''}${completed ? ' is-completed' : ''}`}
        aria-current={active ? 'page' : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className="course-curriculum-item is-disabled" aria-disabled="true">
      {content}
    </div>
  )
}

function CurriculumList({
  courseWeek,
  currentSlug,
  completedProgressKeys,
}: {
  courseWeek: CourseWeek
  currentSlug: string
  completedProgressKeys: string[]
}) {
  const weekSlug = `week-${courseWeek.week}`

  return (
    <div className="course-curriculum-list">
      {courseWeek.items.map((item, index) => (
        <CurriculumItem
          key={`${item.title}-${index}`}
          item={item}
          currentSlug={currentSlug}
          weekSlug={weekSlug}
          completedProgressKeys={completedProgressKeys}
        />
      ))}
    </div>
  )
}

export default function LessonShell({
  lesson,
  courseWeek,
  lessonIndex,
  lessonTotal,
  previousLesson,
  nextLesson,
  completedProgressKeys,
  children,
}: LessonShellProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const visibleLessonNumber = lessonIndex >= 0 ? lessonIndex + 1 : lesson.order
  const lessonProgressLabel =
    lessonTotal > 0 ? `Lesson ${visibleLessonNumber} of ${lessonTotal}` : `Lesson ${lesson.order}`

  useEffect(() => {
    function updateReadingProgress() {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      setReadingProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }

    updateReadingProgress()
    window.addEventListener('scroll', updateReadingProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateReadingProgress)
  }, [])

  return (
    <main className="course-player">
      <div
        className="course-reading-progress"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readingProgress)}
        style={{ width: `${readingProgress}%` }}
      />

      <header className="course-player-header">
        <div className="course-player-header-inner">
          <Link href="/course" className="course-player-brand">
            <span className="course-player-mark">AI</span>
            <span>Theory Of You Academy</span>
          </Link>

          <nav className="course-player-toplinks" aria-label="Course links">
            <Link href={courseWeek.overviewHref}>Week overview</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
        </div>
      </header>

      <section className="course-player-titlebar">
        <div className="course-player-titlebar-inner">
          <div>
            <nav className="course-breadcrumb" aria-label="Breadcrumb">
              <Link href="/course">AI Foundations</Link>
              <span aria-hidden="true">/</span>
              <Link href={courseWeek.overviewHref}>Week {courseWeek.week}</Link>
              <span aria-hidden="true">/</span>
              <span>{lesson.title}</span>
            </nav>

            <div className="course-lesson-kicker">
              <span>{lessonProgressLabel}</span>
              <span>{lesson.readingTime}</span>
              <span>{lesson.difficulty}</span>
            </div>

            <h1>{lesson.title}</h1>
            {lesson.description && <p>{lesson.description}</p>}
          </div>
        </div>
      </section>

      <div className="course-player-grid">
        <section className="course-mobile-curriculum" aria-label="Course content">
          <details>
            <summary>
              <span>Course content</span>
              <span>Week {courseWeek.week}</span>
            </summary>
            <CurriculumList
              courseWeek={courseWeek}
              currentSlug={lesson.slug}
              completedProgressKeys={completedProgressKeys}
            />
          </details>
        </section>

        <article className="course-lesson-card">{children}</article>

        <aside className="course-curriculum-sidebar" aria-label="Current week curriculum">
          <div className="course-curriculum-panel">
            <div className="course-curriculum-heading">
              <span>Course content</span>
              <strong>Week {courseWeek.week}: {courseWeek.title}</strong>
            </div>
            <CurriculumList
              courseWeek={courseWeek}
              currentSlug={lesson.slug}
              completedProgressKeys={completedProgressKeys}
            />
          </div>
        </aside>
      </div>

      <nav className="course-bottom-nav" aria-label="Lesson navigation">
        <div className="course-bottom-nav-inner">
          {previousLesson ? (
            <Link href={previousLesson.href} className="course-nav-card">
              <span>Previous lesson</span>
              <strong>{previousLesson.title}</strong>
            </Link>
          ) : (
            <div className="course-nav-card is-muted">
              <span>Previous lesson</span>
              <strong>Start of week</strong>
            </div>
          )}

          <Link href={courseWeek.overviewHref} className="course-nav-card is-center">
            <span>Back to week overview</span>
            <strong>Week {courseWeek.week}</strong>
          </Link>

          {nextLesson ? (
            <Link href={nextLesson.href} className="course-nav-card is-next">
              <span>Next lesson</span>
              <strong>{nextLesson.title}</strong>
            </Link>
          ) : (
            <Link
              href={courseWeek.quizHref ?? courseWeek.projectHref ?? courseWeek.overviewHref}
              className="course-nav-card is-next is-accent"
            >
              <span>Next step</span>
              <strong>{courseWeek.quizHref ? 'Take the self-check' : 'Open the project'}</strong>
            </Link>
          )}
        </div>
      </nav>
    </main>
  )
}
