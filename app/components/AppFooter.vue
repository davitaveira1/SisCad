<template>
  <footer class="bg-background-card border-t border-surface-border mt-auto">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Logo / Nome -->
        <div class="flex items-center gap-2 text-content font-semibold">
          🚀 <span>Cadastro<span class="text-primary">App</span></span>
        </div>

        <!-- Links -->
        <nav class="flex items-center gap-6 text-sm">
          <NuxtLink to="/" class="text-content-secondary hover:text-primary transition-colors">
            Início
          </NuxtLink>
          <NuxtLink to="/NovoCadastro" class="text-content-secondary hover:text-primary transition-colors">
            Novo Cadastro
          </NuxtLink>
        </nav>

        <!-- Copyright -->
        <p class="text-content-muted text-xs">
          © {{ new Date().getFullYear() }} CadastroApp. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
