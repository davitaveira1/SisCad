import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#app'

let supabase: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
    if (supabase) {
        return supabase
    }

    const config = useRuntimeConfig()
    const supabaseUrl = config.public.supabaseUrl as string
    const supabaseKey = config.public.supabaseKey as string

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('SUPABASE_URL e SUPABASE_KEY devem estar definidos no .env')
    }

    supabase = createClient(supabaseUrl, supabaseKey)
    return supabase
}
