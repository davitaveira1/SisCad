<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import type { Funcionario } from '~/types/Funcionario'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { useFuncionario } from '~/composables/useFuncionario'

defineProps<{
  funcionarios: Funcionario[]
  loading: boolean
}>()

const toast = useToast()
const { remove } = useFuncionario()

const showDeleteModal = ref(false)
const deletingId = ref<number | null>(null)
const deletingName = ref('')
const deleteLoading = ref(false)

function openDeleteModal(func: Funcionario) {
  deletingId.value = func.id
  deletingName.value = func.nome
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deletingId.value = null
  deletingName.value = ''
}

async function confirmDelete() {
  if (!deletingId.value) return

  deleteLoading.value = true
  const success = await remove(deletingId.value)
  deleteLoading.value = false

  if (success) {
    toast.success('Funcionário removido com sucesso!')
  } else {
    toast.error('Erro ao remover funcionário.')
  }

  closeDeleteModal()
}
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-surface-border">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <svg class="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span class="ml-3 text-content-secondary text-sm">Carregando...</span>
    </div>

    <!-- Tabela -->
    <table v-else-if="funcionarios.length > 0" class="w-full text-left">
      <thead>
        <tr class="bg-background-subtle border-b border-surface-border">
          <th class="px-6 py-3 text-xs font-semibold text-content-secondary uppercase tracking-wider">Nome</th>
          <th class="px-6 py-3 text-xs font-semibold text-content-secondary uppercase tracking-wider">Cargo</th>
          <th class="px-6 py-3 text-xs font-semibold text-content-secondary uppercase tracking-wider">E-mail</th>
          <th class="px-6 py-3 text-xs font-semibold text-content-secondary uppercase tracking-wider text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="func in funcionarios"
          :key="func.id"
          class="border-b border-surface-border last:border-b-0 hover:bg-background-hover transition-colors duration-150"
        >
          <td class="px-6 py-4 text-sm font-medium text-content">{{ func.nome }}</td>
          <td class="px-6 py-4 text-sm text-content-secondary">{{ func.cargo }}</td>
          <td class="px-6 py-4 text-sm text-content-secondary">{{ func.email || '—' }}</td>
          <td class="px-6 py-4 text-right">
            <div class="inline-flex items-center gap-2">
              <NuxtLink
                :to="`/funcionario/${func.id}`"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-light border border-primary/30 hover:border-primary rounded-lg transition-all duration-200"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </NuxtLink>

              <button
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-error hover:text-red-400 border border-error/30 hover:border-error rounded-lg transition-all duration-200"
                @click="openDeleteModal(func)"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Deletar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Vazio -->
    <div v-else class="flex flex-col items-center justify-center py-12 text-content-muted">
      <span class="text-3xl mb-2">📭</span>
      <p class="text-sm">Nenhum funcionário encontrado.</p>
    </div>

    <!-- Modal de confirmação -->
    <ConfirmModal
      :is-open="showDeleteModal"
      title="Deletar funcionário"
      :message="`Deseja realmente deletar o funcionário '${deletingName}'? Esta ação não pode ser desfeita.`"
      confirm-label="Deletar"
      cancel-label="Cancelar"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />
  </div>
</template>
