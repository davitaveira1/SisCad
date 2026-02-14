<script setup lang="ts">
import LoginForm from '~/components/LoginForm.vue'

definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4 py-12">
    <div class="w-full max-w-md text-center">
      <h1 class="text-3xl font-bold text-content mb-2">
        Bem-vindo ao Cadastro<span class="text-primary">App</span>
      </h1>
      <p class="text-content-secondary mb-8">
        Acesse sua conta ou crie uma nova
      </p>

      <LoginForm />
    </div>
  </div>
</template>
