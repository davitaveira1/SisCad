<script setup lang="ts">
import { defineProps } from 'vue'
import type { Funcionario } from '~/types/Funcionario'

defineProps<{
  funcionarios: Funcionario[]
  loading: boolean
}>()
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
        </tr>
      </tbody>
    </table>

    <!-- Vazio -->
    <div v-else class="flex flex-col items-center justify-center py-12 text-content-muted">
      <span class="text-3xl mb-2">📭</span>
      <p class="text-sm">Nenhum funcionário encontrado.</p>
    </div>
  </div>
</template>
