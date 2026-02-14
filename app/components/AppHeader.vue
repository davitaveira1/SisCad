<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Novo Cadastro', to: '/NovoCadastro' },
]

function isActive(to: string): boolean {
  return route.path === to
}
</script>

<template>
  <header class="bg-background border-b border-surface-border sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold text-content hover:text-primary transition-colors">
        🚀 <span>Cadastro<span class="text-primary">App</span></span>
      </NuxtLink>

      <!-- Nav Desktop -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            isActive(link.to)
              ? 'bg-primary text-content-inverse'
              : 'text-content-secondary hover:text-content hover:bg-background-hover',
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Hamburger Mobile -->
      <button
        class="md:hidden p-2 rounded-lg text-content-secondary hover:text-content hover:bg-background-hover transition-colors"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Nav Mobile -->
    <nav
      v-if="mobileMenuOpen"
      class="md:hidden border-t border-surface-border bg-background px-6 py-3 flex flex-col gap-1"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :class="[
          'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          isActive(link.to)
            ? 'bg-primary text-content-inverse'
            : 'text-content-secondary hover:text-content hover:bg-background-hover',
        ]"
        @click="mobileMenuOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
