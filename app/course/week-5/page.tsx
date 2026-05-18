import { notFound } from 'next/navigation'
import WeekOverviewPage from '@/components/WeekOverviewPage'
import { getCourseWeek } from '@/lib/course/structure'
import { getWeekOverview } from '@/lib/course/week-overviews'

export default function WeekFivePage() {
  const courseWeek = getCourseWeek(5)
  const overview = getWeekOverview(5)

  if (!courseWeek || !overview) notFound()

  return <WeekOverviewPage courseWeek={courseWeek} overview={overview} />
}
