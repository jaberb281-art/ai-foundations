export type CourseItemKind = 'lesson' | 'quiz' | 'project'

export type CourseItem = {
  title: string
  href?: string
  slug?: string
  kind: CourseItemKind
  available: boolean
  comingSoon?: boolean
}

export type CourseWeek = {
  week: number
  title: string
  overviewHref: string
  quizHref?: string
  projectHref?: string
  items: CourseItem[]
}

export type LessonNavTarget = {
  title: string
  href: string
}

export function getProgressKey(itemType: CourseItemKind, week: string, slug: string) {
  return `${itemType}:${week}:${slug}`
}

export function getCourseItemProgressSlug(item: CourseItem) {
  if (item.slug) return item.slug
  if (item.kind === 'quiz') return 'self-check'
  if (item.kind === 'project') return 'project'
  return null
}

export const COURSE_WEEKS: CourseWeek[] = [
  {
    week: 1,
    title: 'AI Foundations',
    overviewHref: '/course/week-1',
    quizHref: '/course/week-1/quiz',
    projectHref: '/course/week-1/project',
    items: [
      {
        title: 'What is AI?',
        href: '/course/week-1/what-is-ai',
        slug: 'what-is-ai',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'How AI Learns',
        href: '/course/week-1/how-ai-learns',
        slug: 'how-ai-learns',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'AI vs Human Thinking',
        href: '/course/week-1/ai-vs-human-thinking',
        slug: 'ai-vs-human-thinking',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'Week 1 Self-Check',
        href: '/course/week-1/quiz',
        slug: 'self-check',
        kind: 'quiz',
        available: true,
      },
      {
        title: 'Week 1 Project',
        href: '/course/week-1/project',
        slug: 'project',
        kind: 'project',
        available: true,
      },
    ],
  },
  {
    week: 2,
    title: 'Prompt Engineering Basics',
    overviewHref: '/course/week-2',
    quizHref: '/course/week-2/quiz',
    projectHref: '/course/week-2/project',
    items: [
      {
        title: 'What is Prompting?',
        href: '/course/week-2/what-is-prompting',
        slug: 'what-is-prompting',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'How to Give Better Instructions',
        href: '/course/week-2/how-to-give-better-instructions',
        slug: 'how-to-give-better-instructions',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'Common Prompting Mistakes',
        href: '/course/week-2/common-prompting-mistakes',
        slug: 'common-prompting-mistakes',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'Week 2 Self-Check',
        href: '/course/week-2/quiz',
        slug: 'self-check',
        kind: 'quiz',
        available: true,
      },
      {
        title: 'Week 2 Project',
        href: '/course/week-2/project',
        slug: 'project',
        kind: 'project',
        available: true,
      },
    ],
  },
  {
    week: 3,
    title: 'AI Tools & Workflows',
    overviewHref: '/course/week-3',
    quizHref: '/course/week-3/quiz',
    projectHref: '/course/week-3/project',
    items: [
      {
        title: 'Choosing the Right AI Tool',
        href: '/course/week-3/choosing-the-right-ai-tool',
        slug: 'choosing-the-right-ai-tool',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'Building Simple AI Workflows',
        href: '/course/week-3/building-simple-ai-workflows',
        slug: 'building-simple-ai-workflows',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'Turning AI Output Into Real Work',
        href: '/course/week-3/turning-ai-output-into-real-work',
        slug: 'turning-ai-output-into-real-work',
        kind: 'lesson',
        available: true,
      },
      {
        title: 'Week 3 Self-Check',
        href: '/course/week-3/quiz',
        slug: 'self-check',
        kind: 'quiz',
        available: true,
      },
      {
        title: 'Week 3 Project',
        href: '/course/week-3/project',
        slug: 'project',
        kind: 'project',
        available: true,
      },
    ],
  },
  {
    week: 4,
    title: 'Building With AI',
    overviewHref: '/course/week-4',
    projectHref: '/course/week-4/project',
    items: [
      {
        title: 'Finding a Problem Worth Solving',
        kind: 'lesson',
        available: false,
        comingSoon: true,
      },
      {
        title: 'Designing an AI Feature',
        kind: 'lesson',
        available: false,
        comingSoon: true,
      },
      {
        title: 'Planning a Simple AI Product',
        kind: 'lesson',
        available: false,
        comingSoon: true,
      },
      {
        title: 'Week 4 Project',
        href: '/course/week-4/project',
        slug: 'project',
        kind: 'project',
        available: true,
      },
    ],
  },
  {
    week: 5,
    title: 'Final AI Project',
    overviewHref: '/course/week-5',
    projectHref: '/course/week-5/project',
    items: [
      {
        title: 'Choosing Your Final Project',
        kind: 'lesson',
        available: false,
        comingSoon: true,
      },
      {
        title: 'Building the Project Story',
        kind: 'lesson',
        available: false,
        comingSoon: true,
      },
      {
        title: 'Presenting Your AI Work',
        kind: 'lesson',
        available: false,
        comingSoon: true,
      },
      {
        title: 'Final Project',
        href: '/course/week-5/project',
        slug: 'project',
        kind: 'project',
        available: true,
      },
    ],
  },
]

export function getCourseWeek(week: number) {
  return COURSE_WEEKS.find((courseWeek) => courseWeek.week === week)
}

export function getLessonItems(week: CourseWeek) {
  return week.items.filter((item) => item.kind === 'lesson' && item.available && item.href)
}

export function getLessonPosition(week: CourseWeek, slug: string) {
  const lessons = getLessonItems(week)
  const index = lessons.findIndex((item) => item.slug === slug)

  return {
    index,
    total: lessons.length,
  }
}

export function getLessonNavigation(week: CourseWeek, slug: string) {
  const lessons = getLessonItems(week)
  const index = lessons.findIndex((item) => item.slug === slug)
  const previous = index > 0 ? lessons[index - 1] : undefined
  const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined

  return {
    previous: previous?.href ? { title: previous.title, href: previous.href } : null,
    next: next?.href ? { title: next.title, href: next.href } : null,
  }
}
