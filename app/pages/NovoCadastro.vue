<script setup lang="ts">
import FormFuncionario from '~/components/FormFuncionario.vue'

definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold text-content mb-2">Novo Cadastro</h1>
    <p class="text-content-secondary mb-8">Preencha os dados do funcionário.</p>

    <div class="bg-background-card border border-surface-border rounded-2xl p-8">
      <FormFuncionario :is-novo="true" />
    </div>
  </div>
</template>
