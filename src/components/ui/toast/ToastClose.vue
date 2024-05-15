<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastClose, type ToastCloseProps } from 'radix-vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastClose v-bind="delegatedProps" :class="cn('sp-absolute sp-right-2 sp-top-2 sp-rounded-md sp-p-1 sp-text-foreground/50 sp-opacity-0 sp-transition-opacity hover:sp-text-foreground focus:sp-opacity-100 focus:sp-outline-none focus:sp-ring-2 group-hover:sp-opacity-100 group-[.destructive]:sp-text-red-300 group-[.destructive]:hover:sp-text-red-50 group-[.destructive]:focus:sp-ring-red-400 group-[.destructive]:focus:sp-ring-offset-red-600', props.class)">
    <X class="h-4 w-4" />
  </ToastClose>
</template>
