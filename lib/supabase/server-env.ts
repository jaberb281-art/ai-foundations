export function requireSupabaseServiceRoleKey() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error('Missing Supabase server environment variable: SUPABASE_SERVICE_ROLE_KEY.')
  }

  return serviceRoleKey
}
