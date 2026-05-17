import { createServerClient } from '@/lib/supabase/server'

export type ProgressItemType = 'lesson' | 'quiz' | 'project'

export type LearningProgress = {
  id: string
  user_id: string
  item_type: ProgressItemType
  week: string
  slug: string
  completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
}

type ProgressParams = {
  userId: string
  itemType: ProgressItemType
  week: string
  slug: string
}

export async function getUserProgress(userId: string) {
  const supabase = await createServerClient()

  return supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .returns<LearningProgress[]>()
}

export async function markProgressComplete({
  userId,
  itemType,
  week,
  slug,
}: ProgressParams) {
  const supabase = await createServerClient()
  const completedAt = new Date().toISOString()

  return supabase
    .from('learning_progress')
    .upsert(
      {
        user_id: userId,
        item_type: itemType,
        week,
        slug,
        completed: true,
        completed_at: completedAt,
      },
      { onConflict: 'user_id,item_type,week,slug' }
    )
    .select()
    .single<LearningProgress>()
}

export async function markProgressIncomplete({
  userId,
  itemType,
  week,
  slug,
}: ProgressParams) {
  const supabase = await createServerClient()

  return supabase
    .from('learning_progress')
    .upsert(
      {
        user_id: userId,
        item_type: itemType,
        week,
        slug,
        completed: false,
        completed_at: null,
      },
      { onConflict: 'user_id,item_type,week,slug' }
    )
    .select()
    .single<LearningProgress>()
}
