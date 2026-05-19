import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import { createServerClient } from '@/lib/supabase/server'

type LoginPageProps = {
  searchParams: Promise<{
    next?: string
  }>
}

function getSafeNextPath(next?: string) {
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return '/dashboard'
  }

  return next
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const params = await searchParams
    redirect(getSafeNextPath(params.next))
  }

  return <LoginForm />
}
