import { ref } from 'vue'
import { getSupabaseClient } from '~/utils/supabaseClient'
import type { Funcionario } from '~/types/Funcionario'

const funcionarios = ref<Funcionario[]>([])
const loading = ref(false)
const error = ref('')

export function useFuncionario() {
    async function fetchAll(): Promise<void> {
        loading.value = true
        error.value = ''

        try {
            const supabase = getSupabaseClient()
            const { data, error: dbError } = await supabase
                .from('funcionarios')
                .select('*')
                .order('id', { ascending: true })

            if (dbError) {
                error.value = dbError.message
                return
            }

            funcionarios.value = data as Funcionario[]
        } catch (err: any) {
            error.value = err.message || 'Erro ao buscar funcionários'
        } finally {
            loading.value = false
        }
    }

    async function create(data: Omit<Funcionario, 'id' | 'created_at'>): Promise<boolean> {
        loading.value = true
        error.value = ''

        try {
            const supabase = getSupabaseClient()
            const { error: dbError } = await supabase
                .from('funcionarios')
                .insert(data)

            if (dbError) {
                error.value = dbError.message
                return false
            }

            return true
        } catch (err: any) {
            error.value = err.message || 'Erro ao cadastrar funcionário'
            return false
        } finally {
            loading.value = false
        }
    }

    async function fetchById(id: number): Promise<Funcionario | null> {
        // Tenta achar no estado global primeiro
        const cached = funcionarios.value.find((f) => f.id === id)
        if (cached) return cached

        loading.value = true
        error.value = ''

        try {
            const supabase = getSupabaseClient()
            const { data, error: dbError } = await supabase
                .from('funcionarios')
                .select('*')
                .eq('id', id)
                .single()

            if (dbError) {
                error.value = dbError.message
                return null
            }

            return data as Funcionario
        } catch (err: any) {
            error.value = err.message || 'Erro ao buscar funcionário'
            return null
        } finally {
            loading.value = false
        }
    }

    async function update(id: number, data: Omit<Funcionario, 'id' | 'created_at'>): Promise<boolean> {
        loading.value = true
        error.value = ''

        try {
            const supabase = getSupabaseClient()
            const { error: dbError } = await supabase
                .from('funcionarios')
                .update(data)
                .eq('id', id)

            if (dbError) {
                error.value = dbError.message
                return false
            }

            await fetchAll()
            return true
        } catch (err: any) {
            error.value = err.message || 'Erro ao atualizar funcionário'
            return false
        } finally {
            loading.value = false
        }
    }

    async function remove(id: number): Promise<boolean> {
        loading.value = true
        error.value = ''

        try {
            const supabase = getSupabaseClient()
            const { error: dbError } = await supabase
                .from('funcionarios')
                .delete()
                .eq('id', id)

            if (dbError) {
                error.value = dbError.message
                return false
            }

            // Remove do estado global
            funcionarios.value = funcionarios.value.filter((f) => f.id !== id)
            return true
        } catch (err: any) {
            error.value = err.message || 'Erro ao deletar funcionário'
            return false
        } finally {
            loading.value = false
        }
    }

    return {
        funcionarios,
        loading,
        error,
        fetchAll,
        create,
        fetchById,
        update,
        remove,
    }
}
