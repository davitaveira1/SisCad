<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import AppButton from '~/components/AppButton.vue'
import AppInput from '~/components/AppInput.vue'
import BaseDropdown from '~/components/BaseDropdown.vue'
import { useFuncionario } from '~/composables/useFuncionario'

import type { Funcionario } from '~/types/Funcionario'

interface Props {
  isNovo?: boolean
  initialData?: Funcionario | null
}

const props = withDefaults(defineProps<Props>(), {
  isNovo: true,
  initialData: null,
})

const router = useRouter()
const toast = useToast()
const { create, update, loading } = useFuncionario()

const nome = ref('')
const cargo = ref('')
const endereco = ref('')
const email = ref('')
const salario = ref('')

// Erros de validação
const nomeError = ref('')
const cargoError = ref('')
const salarioError = ref('')

// Preenche os campos quando initialData é fornecido (edição)
watch(() => props.initialData, (data) => {
  if (data) {
    nome.value = data.nome
    cargo.value = data.cargo
    endereco.value = data.endereco || ''
    email.value = data.email || ''
    salario.value = String(data.salario)
  }
}, { immediate: true })

// Limpa erros ao digitar
watch(nome, () => { nomeError.value = '' })
watch(cargo, () => { cargoError.value = '' })
watch(salario, () => { salarioError.value = '' })

const cargos = [
  'Analista de Suporte Técnico',
  'Desenvolvedor Frontend',
  'Gerente Financeiro',
  'Assistente de Recursos Humanos',
  'Coordenador de Projetos',
  'Analista de Dados',
  'Consultor Comercial',
  'Designer Gráfico',
  'Engenheiro de Produção',
  'Diretor de Operações',
]

function resetForm() {
  nome.value = ''
  cargo.value = ''
  endereco.value = ''
  email.value = ''
  salario.value = ''
}

function validate(): boolean {
  nomeError.value = ''
  cargoError.value = ''
  salarioError.value = ''

  let valid = true

  if (!nome.value.trim()) {
    nomeError.value = 'Informe o nome do funcionário.'
    valid = false
  }

  if (!cargo.value) {
    cargoError.value = 'Selecione o cargo.'
    valid = false
  }

  if (!salario.value || Number(salario.value) <= 0) {
    salarioError.value = 'Informe um salário válido.'
    valid = false
  }

  return valid
}

function buildPayload() {
  return {
    nome: nome.value.trim(),
    cargo: cargo.value.trim(),
    endereco: endereco.value.trim() || null,
    email: email.value.trim() || null,
    salario: Number(salario.value),
  }
}

async function handleSubmit() {
  if (!validate()) return

  if (props.isNovo) {
    const success = await create(buildPayload())

    if (success) {
      toast.success('Funcionário cadastrado com sucesso!')
      resetForm()
    } else {
      toast.error('Erro ao cadastrar funcionário.')
    }
  } else {
    if (!props.initialData) return

    const success = await update(props.initialData.id, buildPayload())

    if (success) {
      toast.success('Funcionário atualizado com sucesso!')
      await router.push('/')
    } else {
      toast.error('Erro ao atualizar funcionário.')
    }
  }
}
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
    <AppInput
      v-model="nome"
      label="Nome"
      type="text"
      placeholder="Nome do funcionário"
      :error="nomeError"
      required
    />

    <BaseDropdown
      v-model="cargo"
      label="Cargo"
      :options="cargos"
      placeholder="Selecione o cargo"
      :error="cargoError"
      required
    />

    <AppInput
      v-model="endereco"
      label="Endereço"
      type="text"
      placeholder="Rua, número, bairro..."
    />

    <AppInput
      v-model="email"
      label="E-mail"
      type="email"
      placeholder="funcionario@empresa.com"
    />

    <AppInput
      v-model="salario"
      label="Salário"
      type="number"
      placeholder="0.00"
      :error="salarioError"
      required
    />

    <AppButton variant="primary" size="lg" type="submit" :loading="loading" class="w-full mt-2">
      {{ isNovo ? 'Salvar' : 'Editar' }}
    </AppButton>
  </form>
</template>
