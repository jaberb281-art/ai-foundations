import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { getLesson, getLessonsForWeek } from '@/lib/mdx/loader'
import {
  getCourseWeek,
  getLessonNavigation,
  getLessonPosition,
  getProgressKey,
} from '@/lib/course/structure'
import { getAuthenticatedUserProgress } from '@/lib/progress'
import Quiz from '@/components/Quiz'
import LessonShell from '@/components/LessonShell'
import CompleteButton from '@/components/CompleteButton'
import {
  Callout,
  InsightCard,
  ConceptGrid,
  ConceptPill,
  KeyTerm,
  Steps,
  Step,
  CompareBlock,
  StatRow,
  StatCard,
  Divider,
} from '@/components/mdx-components'

export async function generateStaticParams() {
  const params: { week: string; lesson: string }[] = []

  for (let w = 1; w <= 5; w++) {
    const lessons = getLessonsForWeek(w)
    lessons.forEach((lesson) => {
      params.push({ week: `week-${w}`, lesson: lesson.slug })
    })
  }

  return params
}

interface Props {
  params: Promise<{ week: string; lesson: string }>
}

export async function generateMetadata({ params }: Props) {
  const { week, lesson: lessonSlug } = await params
  const weekNumber = parseInt(week.replace('week-', ''), 10)
  const lesson = await getLesson(weekNumber, lessonSlug)

  if (!lesson) return {}

  return {
    title: `${lesson.title} - AI Foundations`,
    description: lesson.description ?? `Week ${weekNumber}: ${lesson.title}`,
  }
}

async function loadQuiz(weekNumber: number, lessonSlug: string) {
  try {
    const fs = await import('fs')
    const path = await import('path')
    const quizPath = path.join(
      process.cwd(),
      'content',
      `week-${weekNumber}`,
      `${lessonSlug}.quiz.json`
    )

    if (!fs.existsSync(quizPath)) return null

    const raw = fs.readFileSync(quizPath, 'utf-8')
    return JSON.parse(raw) as {
      title: string
      questions: { question: string; options: string[]; answer: string }[]
    }
  } catch {
    return null
  }
}

export default async function LessonPage({ params }: Props) {
  const { week, lesson: lessonSlug } = await params
  const weekNumber = parseInt(week.replace('week-', ''), 10)

  const lesson = await getLesson(weekNumber, lessonSlug)
  if (!lesson) notFound()

  const courseWeek = getCourseWeek(weekNumber)
  if (!courseWeek) notFound()

  const quizData = await loadQuiz(weekNumber, lessonSlug)
  const lessonPosition = getLessonPosition(courseWeek, lessonSlug)
  const lessonNavigation = getLessonNavigation(courseWeek, lessonSlug)
  const { data: progressRows } = await getAuthenticatedUserProgress()
  const completedProgressKeys = progressRows
    .filter((progress) => progress.completed)
    .map((progress) => getProgressKey(progress.item_type, progress.week, progress.slug))
  const currentLessonCompleted = completedProgressKeys.includes(
    getProgressKey('lesson', week, lessonSlug)
  )

  const mdxComponents = {
    Callout,
    InsightCard,
    ConceptGrid,
    ConceptPill,
    KeyTerm,
    Steps,
    Step,
    CompareBlock,
    StatRow,
    StatCard,
    Divider,
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  }

  return (
    <LessonShell
      lesson={lesson}
      courseWeek={courseWeek}
      lessonIndex={lessonPosition.index}
      lessonTotal={lessonPosition.total}
      previousLesson={lessonNavigation.previous}
      nextLesson={lessonNavigation.next}
      completedProgressKeys={completedProgressKeys}
    >
      <div className="lesson-prose">
        <MDXRemote
          source={lesson.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </div>

      {quizData && <Quiz title={quizData.title} questions={quizData.questions} />}

      <div className="course-complete-action">
        <CompleteButton
          itemType="lesson"
          week={week}
          slug={lessonSlug}
          initialCompleted={currentLessonCompleted}
          label="Mark lesson complete"
        />
      </div>
    </LessonShell>
  )
}
