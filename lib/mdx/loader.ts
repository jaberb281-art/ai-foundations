import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDir = path.join(process.cwd(), 'content')

export interface LessonMeta {
    slug: string
    week: number
    order: number
    title: string
    description: string
    duration: number
    difficulty: string
    tags: string[]
    objectives: string[]
    colab_url?: string
    video_id?: string
    readingTime: string
    href: string
}

export interface LessonContent extends LessonMeta {
    content: string
}

// Get all lessons for a week
export function getLessonsForWeek(week: number): LessonMeta[] {
    const weekDir = path.join(contentDir, `week-${week}`)

    if (!fs.existsSync(weekDir)) return []

    const files = fs.readdirSync(weekDir).filter(f => f.endsWith('.mdx'))

    return files
        .map(file => {
            const slug = file.replace('.mdx', '')
            const filePath = path.join(weekDir, file)
            const raw = fs.readFileSync(filePath, 'utf-8')
            const { data } = matter(raw)
            const rt = readingTime(raw)

            return {
                slug,
                week,
                order: data.order ?? 0,
                title: data.title ?? slug,
                description: data.description ?? '',
                duration: data.duration ?? 20,
                difficulty: data.difficulty ?? 'beginner',
                tags: data.tags ?? [],
                objectives: data.objectives ?? [],
                colab_url: data.colab_url,
                video_id: data.video_id,
                readingTime: rt.text,
                href: `/course/week-${week}/${slug}`,
            }
        })
        .sort((a, b) => a.order - b.order)
}

// Get a single lesson with content
export async function getLesson(week: number, slug: string): Promise<LessonContent | null> {
    const filePath = path.join(contentDir, `week-${week}`, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) return null

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const rt = readingTime(raw)

    return {
        slug,
        week,
        order: data.order ?? 0,
        title: data.title ?? slug,
        description: data.description ?? '',
        duration: data.duration ?? 20,
        difficulty: data.difficulty ?? 'beginner',
        tags: data.tags ?? [],
        objectives: data.objectives ?? [],
        colab_url: data.colab_url,
        video_id: data.video_id,
        readingTime: rt.text,
        href: `/course/week-${week}/${slug}`,
        content,
    }
}

// Get all weeks summary

export function getAllWeeks() {
    return [1, 2, 3, 4, 5].map(week => ({
        week,
        lessons: getLessonsForWeek(week),
    }))
}