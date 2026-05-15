export interface LessonFrontmatter {
    title: string
    description: string
    week: number
    order: number
    duration: number          // minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    tags: string[]
    objectives: string[]      // "By the end of this lesson you will..."
    prerequisites?: string[]  // lesson slugs
    colab_url?: string        // Google Colab notebook link
    video_id?: string         // YouTube video ID
}

export interface LessonMeta extends LessonFrontmatter {
    slug: string
    href: string              // /course/week-1/what-is-ai
}

export interface LessonContent extends LessonMeta {
    content: string           // serialized MDX
    readingTime: string       // "5 min read"
}
