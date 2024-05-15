<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" :class="cn('sp-flex sp-h-10 sp-w-full sp-rounded-md sp-border sp-border-input sp-bg-background sp-px-3 sp-py-2 sp-text-sm sp-ring-offset-background file:sp-border-0 file:sp-bg-transparent file:sp-text-sm file:sp-font-medium placeholder:sp-text-muted-foreground focus-visible:sp-outline-none focus-visible:sp-ring-2 focus-visible:sp-ring-ring focus-visible:sp-ring-offset-2 disabled:sp-cursor-not-allowed disabled:sp-opacity-50', props.class)">
</template>
