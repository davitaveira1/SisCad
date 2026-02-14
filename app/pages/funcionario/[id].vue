<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FormFuncionario from '~/components/FormFuncionario.vue'
import { useFuncionario } from '~/composables/useFuncionario'
import type { Funcionario } from '~/types/Funcionario'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const { fetchById, loading } = useFuncionario()

const funcionario = ref<Funcionario | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  funcionario.value = await fetchById(id)
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold text-content mb-2">Funcionário</h1>
    <p class="text-content-secondary mb-8">Visualização dos dados do funcionário.</p>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <svg class="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span class="ml-3 text-content-secondary text-sm">Carregando...</span>
    </div>

    <div v-else-if="funcionario" class="bg-background-card border border-surface-border rounded-2xl p-8">
      <FormFuncionario :is-novo="false" :initial-data="funcionario" />
    </div>

    <div v-else class="text-center py-12 text-content-muted">
      <span class="text-3xl mb-2 block">🔍</span>
      <p>Funcionário não encontrado.</p>
    </div>
  </div>
</template>
