import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getSupabaseClient } from '~/utils/supabaseClient'
import type { User } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const loading = ref(false)
const error = ref('')

export function useAuth() {
    const router = useRouter()
    const isAuthenticated = computed(() => !!user.value)

    async function login(email: string, password: string): Promise<boolean> {
        loading.value = true
        error.value = ''

        try {
            const supabase = getSupabaseClient()
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (authError) {
                error.value = authError.message
                return false
            }

            user.value = data.user
            await router.push('/')
            return true
        } catch (err: any) {
            error.value = err.message || 'Erro ao fazer login'
            return false
        } finally {
            loading.value = false
        }
    }

    async function register(email: string, password: string, name: string): Promise<boolean> {
        loading.value = true
        error.value = ''

        try {
            const supabase = getSupabaseClient()
            const { data, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            })

            if (authError) {
                error.value = authError.message
                return false
            }

            user.value = data.user
            return true
        } catch (err: any) {
            error.value = err.message || 'Erro ao criar conta'
            return false
        } finally {
            loading.value = false
        }
    }

    async function logout(): Promise<void> {
        loading.value = true
        try {
            const supabase = getSupabaseClient()
            await supabase.auth.signOut()
            user.value = null
            await router.push('/Login')
        } finally {
            loading.value = false
        }
    }

    async function checkAuth(): Promise<boolean> {
        try {
            const supabase = getSupabaseClient()
            const { data } = await supabase.auth.getSession()

            if (data.session) {
                user.value = data.session.user
                return true
            }

            user.value = null
            return false
        } catch {
            user.value = null
            return false
        }
    }

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
    }
}
