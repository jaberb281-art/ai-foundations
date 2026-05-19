import { ReactNode } from 'react'
import LockedCourseState from '@/components/LockedCourseState'
import { getAuthenticatedUserProgress } from '@/lib/progress'
import { getCompletedProgressKeys, isWeekUnlocked } from '@/lib/course/progression'

type UnlockedWeekGateProps = {
  week: number
  children: ReactNode
}

export default async function UnlockedWeekGate({ week, children }: UnlockedWeekGateProps) {
  const { data: progressRows } = await getAuthenticatedUserProgress()
  const completedKeys = getCompletedProgressKeys(progressRows)

  if (!isWeekUnlocked(week, completedKeys)) {
    return <LockedCourseState week={week} title={`Week ${week} is locked`} />
  }

  return children
}
