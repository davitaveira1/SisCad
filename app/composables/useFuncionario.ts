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

    return {
        funcionarios,
        loading,
        error,
        fetchAll,
    }
}
