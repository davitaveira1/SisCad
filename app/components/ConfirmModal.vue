<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import AppButton from '~/components/AppButton.vue'

interface Props {
  isOpen: boolean
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Confirmar ação',
  message: 'Tem certeza de que deseja prosseguir?',
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  loading: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog class="relative z-50" @close="emit('cancel')">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/60" />
      </TransitionChild>

      <!-- Modal -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="ease-out duration-200"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-150"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="w-full max-w-sm bg-background-card border border-surface-border rounded-2xl shadow-xl p-6">
            <!-- Ícone -->
            <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-error/10">
              <svg class="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <DialogTitle class="text-lg font-semibold text-content text-center mb-2">
              {{ title }}
            </DialogTitle>

            <p class="text-sm text-content-secondary text-center mb-6">
              {{ message }}
            </p>

            <div class="flex gap-3">
              <AppButton variant="secondary" size="md" class="flex-1" @click="emit('cancel')">
                {{ cancelLabel }}
              </AppButton>
              <AppButton variant="danger" size="md" :loading="loading" class="flex-1" @click="emit('confirm')">
                {{ confirmLabel }}
              </AppButton>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
