<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  disabled?: boolean
  error?: string
  hint?: string
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  error: '',
  hint: '',
  required: false,
  id: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isFocused = ref(false)
const showPassword = ref(false)

const isPasswordType = computed(() => props.type === 'password')

const currentType = computed(() => {
  if (isPasswordType.value && showPassword.value) {
    return 'text'
  }
  return props.type
})

const inputId = computed(() => {
  return props.id || `input-${Math.random().toString(36).substring(2, 9)}`
})

const inputClasses = computed(() => {
  const base = 'w-full px-4 py-2.5 rounded-lg border text-content bg-background transition-all duration-200 outline-none'
  const padding = isPasswordType.value ? 'pr-12' : ''
  const focus = 'focus:ring-2 focus:ring-primary/30 focus:border-primary'
  const errorStyle = props.error
    ? 'border-error focus:ring-error/30 focus:border-error'
    : 'border-surface-border'
  const disabledStyle = props.disabled ? 'opacity-50 cursor-not-allowed bg-background-subtle' : ''

  return [base, padding, focus, errorStyle, disabledStyle].join(' ')
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="text-sm font-medium text-content"
    >
      {{ label }}
      <span v-if="required" class="text-error ml-0.5">*</span>
    </label>

    <!-- Input wrapper -->
    <div class="relative">
      <slot name="prefix" />

      <input
        :id="inputId"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <!-- Olho toggle senha -->
      <button
        v-if="isPasswordType"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content transition-colors"
        tabindex="-1"
        @click="showPassword = !showPassword"
      >
        <!-- Olho aberto -->
        <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <!-- Olho fechado -->
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
        </svg>
      </button>

      <slot v-if="!isPasswordType" name="suffix" />
    </div>

    <!-- Error message -->
    <p v-if="error" class="text-xs text-error mt-0.5">
      {{ error }}
    </p>

    <!-- Hint -->
    <p v-else-if="hint" class="text-xs text-content-muted mt-0.5">
      {{ hint }}
    </p>
  </div>
</template>
