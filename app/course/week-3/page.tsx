import { notFound } from 'next/navigation'
import WeekOverviewPage from '@/components/WeekOverviewPage'
import { getCourseWeek } from '@/lib/course/structure'
import { getWeekOverview } from '@/lib/course/week-overviews'

export default function WeekThreePage() {
  const courseWeek = getCourseWeek(3)
  const overview = getWeekOverview(3)

  if (!courseWeek || !overview) notFound()

  return <WeekOverviewPage courseWeek={courseWeek} overview={overview} />
}
