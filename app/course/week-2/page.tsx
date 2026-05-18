import { notFound } from 'next/navigation'
import WeekOverviewPage from '@/components/WeekOverviewPage'
import { getCourseWeek } from '@/lib/course/structure'
import { getWeekOverview } from '@/lib/course/week-overviews'

export default function WeekTwoPage() {
  const courseWeek = getCourseWeek(2)
  const overview = getWeekOverview(2)

  if (!courseWeek || !overview) notFound()

  return <WeekOverviewPage courseWeek={courseWeek} overview={overview} />
}
