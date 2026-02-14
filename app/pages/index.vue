<script setup lang="ts">
import { onMounted } from 'vue'
import FuncionarioTable from '~/components/FuncionarioTable.vue'
import { useFuncionario } from '~/composables/useFuncionario'

definePageMeta({
  middleware: ['auth'],
})

const { funcionarios, loading, error, fetchAll } = useFuncionario()

onMounted(() => {
  fetchAll()
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold text-content mb-2">Funcionários</h1>
    <p class="text-content-secondary mb-8">Lista de funcionários cadastrados no sistema.</p>

    <!-- Erro -->
    <div v-if="error" class="mb-6 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
      {{ error }}
    </div>

    <FuncionarioTable :funcionarios="funcionarios" :loading="loading" />
  </div>
</template>
