<script setup lang="ts">
import { ref, watch } from 'vue'
import AppButton from '~/components/AppButton.vue'
import AppInput from '~/components/AppInput.vue'
import { useAuth } from '~/composables/useAuth'

const activeTab = ref<'login' | 'register'>('login')

const { login, register, loading, error } = useAuth()

// Login
const loginEmail = ref('')
const loginPassword = ref('')
const emailError = ref('')
const passwordError = ref('')

// Criar conta
const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const registerConfirmPassword = ref('')
const regNameError = ref('')
const regEmailError = ref('')
const regPasswordError = ref('')
const regConfirmError = ref('')
const registerSuccess = ref(false)

// Limpa erros dos campos ao digitar (Login)
watch(loginEmail, () => { emailError.value = '' })
watch(loginPassword, () => { passwordError.value = '' })

// Limpa erros dos campos ao digitar (Registro)
watch(registerName, () => { regNameError.value = '' })
watch(registerEmail, () => { regEmailError.value = '' })
watch(registerPassword, () => { regPasswordError.value = '' })
watch(registerConfirmPassword, () => { regConfirmError.value = '' })

// Limpa tudo ao trocar de aba
watch(activeTab, () => {
  error.value = ''
  emailError.value = ''
  passwordError.value = ''
  regNameError.value = ''
  regEmailError.value = ''
  regPasswordError.value = ''
  regConfirmError.value = ''
  registerSuccess.value = false
})

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function translateError(message: string): string {
  const translations: Record<string, string> = {
    'Invalid login credentials': 'E-mail ou senha incorretos.',
    'Email not confirmed': 'E-mail ainda não confirmado. Verifique sua caixa de entrada.',
    'User not found': 'Nenhuma conta encontrada com este e-mail.',
    'Too many requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
    'Network request failed': 'Erro de conexão. Verifique sua internet.',
    'User already registered': 'Este e-mail já está cadastrado.',
    'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
  }
  return translations[message] || `Erro: ${message}`
}

async function handleLogin() {
  emailError.value = ''
  passwordError.value = ''
  error.value = ''

  let hasError = false

  if (!loginEmail.value.trim()) {
    emailError.value = 'Informe seu e-mail.'
    hasError = true
  } else if (!isValidEmail(loginEmail.value.trim())) {
    emailError.value = 'Informe um e-mail válido.'
    hasError = true
  }

  if (!loginPassword.value) {
    passwordError.value = 'Informe sua senha.'
    hasError = true
  }

  if (hasError) return

  const success = await login(loginEmail.value.trim(), loginPassword.value)

  if (!success && error.value) {
    error.value = translateError(error.value)
  }
}

async function handleRegister() {
  regNameError.value = ''
  regEmailError.value = ''
  regPasswordError.value = ''
  regConfirmError.value = ''
  error.value = ''
  registerSuccess.value = false

  let hasError = false

  if (!registerName.value.trim()) {
    regNameError.value = 'Informe seu nome.'
    hasError = true
  }

  if (!registerEmail.value.trim()) {
    regEmailError.value = 'Informe seu e-mail.'
    hasError = true
  } else if (!isValidEmail(registerEmail.value.trim())) {
    regEmailError.value = 'Informe um e-mail válido.'
    hasError = true
  }

  if (!registerPassword.value) {
    regPasswordError.value = 'Informe uma senha.'
    hasError = true
  } else if (registerPassword.value.length < 6) {
    regPasswordError.value = 'A senha deve ter pelo menos 6 caracteres.'
    hasError = true
  }

  if (!registerConfirmPassword.value) {
    regConfirmError.value = 'Confirme sua senha.'
    hasError = true
  } else if (registerPassword.value !== registerConfirmPassword.value) {
    regConfirmError.value = 'As senhas não coincidem.'
    hasError = true
  }

  if (hasError) return

  const success = await register(
    registerEmail.value.trim(),
    registerPassword.value,
    registerName.value.trim(),
  )

  if (success) {
    registerSuccess.value = true
  } else if (error.value) {
    error.value = translateError(error.value)
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-background-card border border-surface-border rounded-2xl shadow-lg overflow-hidden">
      <!-- Tabs -->
      <div class="flex border-b border-surface-border">
        <button
          :class="[
            'flex-1 py-3.5 text-sm font-semibold transition-all duration-200',
            activeTab === 'login'
              ? 'text-primary border-b-2 border-primary bg-background'
              : 'text-content-muted hover:text-content-secondary bg-background-card',
          ]"
          @click="activeTab = 'login'"
        >
          Entrar
        </button>
        <button
          :class="[
            'flex-1 py-3.5 text-sm font-semibold transition-all duration-200',
            activeTab === 'register'
              ? 'text-primary border-b-2 border-primary bg-background'
              : 'text-content-muted hover:text-content-secondary bg-background-card',
          ]"
          @click="activeTab = 'register'"
        >
          Criar Conta
        </button>
      </div>

      <!-- Conteúdo -->
      <div class="p-8">
        <!-- Mensagem de erro -->
        <div v-if="error" class="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          {{ error }}
        </div>

        <!-- Mensagem de sucesso no registro -->
        <div v-if="registerSuccess" class="mb-4 p-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm">
          Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.
        </div>

        <!-- Tab: Entrar -->
        <form v-if="activeTab === 'login'" class="flex flex-col gap-5" @submit.prevent="handleLogin">
          <AppInput
            v-model="loginEmail"
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            :error="emailError"
            required
          />

          <AppInput
            v-model="loginPassword"
            label="Senha"
            type="password"
            placeholder="••••••••"
            :error="passwordError"
            required
          />

          <AppButton variant="primary" size="lg" type="submit" :loading="loading" class="w-full mt-2">
            Entrar
          </AppButton>
        </form>

        <!-- Tab: Criar Conta -->
        <form v-else class="flex flex-col gap-5" @submit.prevent="handleRegister">
          <AppInput
            v-model="registerName"
            label="Nome"
            type="text"
            placeholder="Seu nome completo"
            :error="regNameError"
            required
          />

          <AppInput
            v-model="registerEmail"
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            :error="regEmailError"
            required
          />

          <AppInput
            v-model="registerPassword"
            label="Senha"
            type="password"
            placeholder="••••••••"
            :error="regPasswordError"
            hint="Mínimo de 6 caracteres."
            required
          />

          <AppInput
            v-model="registerConfirmPassword"
            label="Confirmar Senha"
            type="password"
            placeholder="••••••••"
            :error="regConfirmError"
            required
          />

          <AppButton variant="primary" size="lg" type="submit" :loading="loading" class="w-full mt-2">
            Criar Conta
          </AppButton>
        </form>
      </div>
    </div>
  </div>
</template>
