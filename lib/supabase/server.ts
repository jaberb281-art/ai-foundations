import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { requireSupabasePublicConfig } from './env'

export const createServerClient = async () => {
    const cookieStore = await cookies()
    const { url, anonKey } = requireSupabasePublicConfig()

    return createSupabaseServerClient(
        url,
        anonKey,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
}
