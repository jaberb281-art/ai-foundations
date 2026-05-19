import { NextResponse, type NextRequest } from 'next/server'
import { COURSE_WEEKS, getCourseItemProgressSlug } from '@/lib/course/structure'
import {
  getUserProgress,
  getAuthenticatedUserId,
  markProgressComplete,
  markProgressIncomplete,
  type ProgressItemType,
} from '@/lib/progress'
import { getCompletedProgressKeys, isWeekUnlocked } from '@/lib/course/progression'

const itemTypes: ProgressItemType[] = ['lesson', 'quiz', 'project']

function isProgressItemType(value: unknown): value is ProgressItemType {
  return typeof value === 'string' && itemTypes.includes(value as ProgressItemType)
}

function isSafePathPart(value: unknown): value is string {
  return typeof value === 'string' && /^[a-z0-9-]+$/.test(value)
}

function validateProgressInput(body: unknown) {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body.' }
  }

  const input = body as Record<string, unknown>

  const itemType = input.itemType
  const week = input.week
  const slug = input.slug
  const completed = input.completed

  if (!isProgressItemType(itemType)) {
    return { error: 'Invalid itemType.' }
  }

  if (!isSafePathPart(week) || !week.startsWith('week-')) {
    return { error: 'Invalid week.' }
  }

  if (!isSafePathPart(slug)) {
    return { error: 'Invalid slug.' }
  }

  if (typeof completed !== 'boolean') {
    return { error: 'Invalid completed value.' }
  }

  return {
    data: {
      itemType,
      week,
      slug,
      completed,
    },
  }
}

function isCompletableCourseItem(itemType: ProgressItemType, week: string, slug: string) {
  const weekNumber = Number.parseInt(week.replace('week-', ''), 10)
  const courseWeek = COURSE_WEEKS.find((item) => item.week === weekNumber)

  return Boolean(
    courseWeek?.items.some(
      (item) =>
        item.kind === itemType &&
        item.available &&
        item.href &&
        getCourseItemProgressSlug(item) === slug
    )
  )
}

export async function GET(request: NextRequest) {
  const userId = await getAuthenticatedUserId()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const itemType = searchParams.get('itemType')
  const week = searchParams.get('week')
  const slug = searchParams.get('slug')

  const { data, error } = await getUserProgress(userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (itemType || week || slug) {
    if (!isProgressItemType(itemType) || !isSafePathPart(week) || !isSafePathPart(slug)) {
      return NextResponse.json({ error: 'Invalid progress query.' }, { status: 400 })
    }

    const item = data.find(
      (progress) =>
        progress.item_type === itemType &&
        progress.week === week &&
        progress.slug === slug
    )

    return NextResponse.json({ progress: item ?? null })
  }

  return NextResponse.json({ progress: data })
}

export async function POST(request: NextRequest) {
  const userId = await getAuthenticatedUserId()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const result = validateProgressInput(body)

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  if (result.data.completed) {
    if (!isCompletableCourseItem(result.data.itemType, result.data.week, result.data.slug)) {
      return NextResponse.json(
        { error: 'This course item is not available to complete yet.' },
        { status: 403 }
      )
    }

    const { data: existingProgress, error: progressError } = await getUserProgress(userId)

    if (progressError) {
      return NextResponse.json({ error: progressError.message }, { status: 500 })
    }

    const completedKeys = getCompletedProgressKeys(existingProgress)

    if (!isWeekUnlocked(result.data.week, completedKeys)) {
      return NextResponse.json(
        { error: 'Complete the previous week before marking this item complete.' },
        { status: 403 }
      )
    }
  }

  const mutation = result.data.completed ? markProgressComplete : markProgressIncomplete
  const { data, error } = await mutation({
    userId,
    itemType: result.data.itemType,
    week: result.data.week,
    slug: result.data.slug,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, progress: data })
}
