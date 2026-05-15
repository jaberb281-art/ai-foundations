export type UserRole = 'student' | 'admin'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type SubmissionStatus = 'submitted' | 'reviewed' | 'approved'
export type FileType = 'pdf' | 'ipynb' | 'zip' | 'md'

export interface Profile {
    id: string
    email: string
    full_name: string | null
    avatar_url: string | null
    github_url: string | null
    linkedin_url: string | null
    bio: string | null
    role: UserRole
    enrolled_at: string
    updated_at: string
}

export interface Week {
    id: number
    number: number
    title: string
    description: string | null
    is_published: boolean
    created_at: string
    lessons?: Lesson[]
}

export interface Lesson {
    id: string
    week_id: number
    slug: string
    title: string
    description: string | null
    duration_mins: number
    difficulty: Difficulty
    order_index: number
    is_published: boolean
    tags: string[]
    created_at: string
}

export interface LessonProgress {
    id: string
    user_id: string
    lesson_id: string
    completed: boolean
    completed_at: string | null
    started_at: string
}

export interface WeekProgress {
    id: string
    user_id: string
    week_id: number
    completed: boolean
    completed_at: string | null
}

export interface Quiz {
    id: string
    lesson_id: string
    title: string
    pass_score: number
    created_at: string
    questions?: QuizQuestion[]
}

export interface QuizQuestion {
    id: string
    quiz_id: string
    question: string
    options: string[]
    answer_index: number
    explanation: string | null
    order_index: number
}

export interface QuizAttempt {
    id: string
    user_id: string
    quiz_id: string
    score: number
    passed: boolean
    answers: Record<string, number>
    attempted_at: string
}

export interface Project {
    id: string
    week_id: number
    title: string
    description: string | null
    difficulty: Difficulty
    order_index: number
}

export interface ProjectSubmission {
    id: string
    user_id: string
    project_id: string
    github_url: string | null
    colab_url: string | null
    screenshot_url: string | null
    description: string | null
    status: SubmissionStatus
    feedback: string | null
    submitted_at: string
    reviewed_at: string | null
}

export interface Certificate {
    id: string
    user_id: string
    issued_at: string
    cert_url: string | null
}

export interface Resource {
    id: string
    lesson_id: string
    title: string
    file_url: string
    file_type: FileType | null
    created_at: string
}

export interface LessonNote {
    id: string
    user_id: string
    lesson_id: string
    content: string | null
    updated_at: string
}

export interface Announcement {
    id: string
    title: string
    body: string
    author_id: string | null
    published: boolean
    created_at: string
}

// ── COMPUTED / COMPOSITE TYPES ──────────────────────────────

export interface WeekWithProgress extends Week {
    progress: WeekProgress | null
    lessons_total: number
    lessons_completed: number
    percent: number
}

export interface LessonWithProgress extends Lesson {
    progress: LessonProgress | null
    resources: Resource[]
    quiz: Quiz | null
}

export interface DashboardStats {
    total_lessons: number
    completed_lessons: number
    overall_percent: number
    current_week: number
    streak_days: number
    certificate_eligible: boolean
}
