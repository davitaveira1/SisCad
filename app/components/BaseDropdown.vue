<script setup lang="ts">
import { computed } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel,
} from '@headlessui/vue'

interface Props {
  modelValue: string
  options: string[]
  label?: string
  placeholder?: string
  required?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Selecione uma opção',
  required: false,
  error: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selected = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <Listbox v-model="selected">
      <ListboxLabel v-if="label" class="text-sm font-medium text-content">
        {{ label }}
        <span v-if="required" class="text-error ml-0.5">*</span>
      </ListboxLabel>

      <div class="relative">
        <ListboxButton
          :class="[
            'w-full px-4 py-2.5 rounded-lg border text-left bg-background transition-all duration-200 outline-none',
            'focus:ring-2 focus:ring-primary/30 focus:border-primary',
            error ? 'border-error' : 'border-surface-border',
            selected ? 'text-content' : 'text-content-muted',
          ]"
        >
          <span class="block truncate">{{ selected || placeholder }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg class="w-4 h-4 text-content-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-background border border-surface-border shadow-lg focus:outline-none"
          >
            <ListboxOption
              v-for="option in options"
              :key="option"
              :value="option"
              v-slot="{ active, selected: isSelected }"
              as="template"
            >
              <li
                :class="[
                  'relative cursor-pointer select-none px-4 py-2.5 text-sm transition-colors',
                  active ? 'bg-primary text-content-inverse' : 'text-content',
                ]"
              >
                <span :class="['block truncate', isSelected ? 'font-semibold' : 'font-normal']">
                  {{ option }}
                </span>
                <span
                  v-if="isSelected"
                  :class="[
                    'absolute inset-y-0 right-0 flex items-center pr-3',
                    active ? 'text-content-inverse' : 'text-primary',
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <p v-if="error" class="text-xs text-error mt-0.5">{{ error }}</p>
  </div>
</template>
