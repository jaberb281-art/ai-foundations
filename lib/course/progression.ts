import { COURSE_WEEKS, CourseItem, CourseItemKind, getCourseItemProgressSlug, getProgressKey } from '@/lib/course/structure'
import { LearningProgress } from '@/lib/progress'

export type CompletedProgressInput = Pick<
  LearningProgress,
  'item_type' | 'week' | 'slug' | 'completed'
>

export type WeekStatus = 'Active' | 'Locked' | 'Completed' | 'Preview'

export type RequiredCourseItem = {
  itemType: CourseItemKind
  week: string
  slug: string
  title: string
  href?: string
  available: boolean
}

export type ActionableRequiredCourseItem = RequiredCourseItem & {
  href: string
}

export type WeekCompletionSummary = {
  completed: number
  total: number
  requiredItems: RequiredCourseItem[]
}

export function getCompletedProgressKeys(progressRows: CompletedProgressInput[] = []) {
  return progressRows
    .filter((progress) => progress.completed)
    .map((progress) => getProgressKey(progress.item_type, progress.week, progress.slug))
}

function getWeekNumber(week: number | string) {
  if (typeof week === 'number') return week
  return Number.parseInt(week.replace('week-', ''), 10)
}

export function getWeekSlug(week: number | string) {
  const weekNumber = getWeekNumber(week)
  return Number.isFinite(weekNumber) ? `week-${weekNumber}` : String(week)
}

export function getRequiredItemsForWeek(week: number | string): RequiredCourseItem[] {
  const weekNumber = getWeekNumber(week)
  const courseWeek = COURSE_WEEKS.find((item) => item.week === weekNumber)

  if (!courseWeek) return []

  const weekSlug = getWeekSlug(weekNumber)

  return courseWeek.items
    .map((item: CourseItem): RequiredCourseItem | null => {
      const slug = getCourseItemProgressSlug(item)

      if (!slug) {
        return null
      }

      return {
        itemType: item.kind,
        week: weekSlug,
        slug,
        title: item.title,
        href: item.href,
        available: item.available,
      }
    })
    .filter((item): item is RequiredCourseItem => Boolean(item))
}

export function getWeekCompletionSummary(
  week: number | string,
  completedKeys: string[]
): WeekCompletionSummary {
  const requiredItems = getRequiredItemsForWeek(week)
  const completed = requiredItems.filter((item) =>
    completedKeys.includes(getProgressKey(item.itemType, item.week, item.slug))
  ).length

  return {
    completed,
    total: requiredItems.length,
    requiredItems,
  }
}

export function isWeekComplete(week: number | string, completedKeys: string[]) {
  const summary = getWeekCompletionSummary(week, completedKeys)
  return summary.total > 0 && summary.completed === summary.total
}

export function isWeekUnlocked(week: number | string, completedKeys: string[]): boolean {
  const weekNumber = getWeekNumber(week)

  if (!Number.isFinite(weekNumber)) return false
  if (weekNumber <= 1) return true

  return isWeekComplete(weekNumber - 1, completedKeys)
}

export function getNextRequiredItem(
  week: number | string,
  completedKeys: string[]
): ActionableRequiredCourseItem | null {
  const requiredItems = getRequiredItemsForWeek(week)

  const nextItem = requiredItems.find(
    (item) =>
      item.available &&
      item.href &&
      !completedKeys.includes(getProgressKey(item.itemType, item.week, item.slug))
  )

  return nextItem ? (nextItem as ActionableRequiredCourseItem) : null
}

export function getCurrentUnlockedWeek(completedKeys: string[]) {
  const unlockedWeeks = COURSE_WEEKS.filter((week) => isWeekUnlocked(week.week, completedKeys))
  return unlockedWeeks.at(-1)?.week ?? 1
}

export function getWeekStatus(week: number | string, completedKeys: string[]): WeekStatus {
  const weekNumber = getWeekNumber(week)
  const courseWeek = COURSE_WEEKS.find((item) => item.week === weekNumber)

  if (!courseWeek) return 'Locked'
  if (!isWeekUnlocked(weekNumber, completedKeys)) return 'Locked'
  if (isWeekComplete(weekNumber, completedKeys)) return 'Completed'

  return courseWeek.items.some((item) => item.available && item.kind === 'lesson')
    ? 'Active'
    : 'Preview'
}

export function getPreviousWeek(week: number | string) {
  const weekNumber = getWeekNumber(week)
  return weekNumber > 1 ? weekNumber - 1 : null
}

export function getNextCourseAction(completedKeys: string[]) {
  for (const week of COURSE_WEEKS) {
    if (!isWeekUnlocked(week.week, completedKeys)) {
      break
    }

    const nextItem = getNextRequiredItem(week.week, completedKeys)
    if (nextItem) {
      return {
        week: week.week,
        weekTitle: week.title,
        title: nextItem.title,
        href: nextItem.href,
      }
    }

    if (!isWeekComplete(week.week, completedKeys)) {
      return {
        week: week.week,
        weekTitle: week.title,
        title: `Week ${week.week} content coming soon`,
        href: week.overviewHref,
      }
    }
  }

  const lastWeek = COURSE_WEEKS.at(-1)

  return {
    week: lastWeek?.week ?? 1,
    weekTitle: lastWeek?.title ?? 'AI Foundations',
    title: 'Review completed course',
    href: '/course',
  }
}
