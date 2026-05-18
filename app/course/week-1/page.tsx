import { notFound } from 'next/navigation'
import WeekOverviewPage from '@/components/WeekOverviewPage'
import { getCourseWeek } from '@/lib/course/structure'
import { getWeekOverview } from '@/lib/course/week-overviews'

export default function WeekOnePage() {
  const courseWeek = getCourseWeek(1)
  const overview = getWeekOverview(1)

  if (!courseWeek || !overview) notFound()

  return <WeekOverviewPage courseWeek={courseWeek} overview={overview} />
}
