<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastViewport, type ToastViewportProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastViewport v-bind="delegatedProps" :class="cn('sp-fixed sp-top-0 sp-z-[100] sp-flex sp-max-h-screen sp-w-full sp-flex-col-reverse sp-p-4 sm:sp-bottom-0 sm:sp-right-0 sm:sp-top-auto sm:sp-flex-col md:sp-max-w-[420px]', props.class)" />
</template>
