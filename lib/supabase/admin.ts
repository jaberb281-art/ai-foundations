import { createClient } from '@supabase/supabase-js'
import { requireSupabasePublicConfig } from './env'
import { requireSupabaseServiceRoleKey } from './server-env'

export const createAdminClient = () => {
    const { url } = requireSupabasePublicConfig()
    const serviceRoleKey = requireSupabaseServiceRoleKey()

    return createClient(url, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
}
