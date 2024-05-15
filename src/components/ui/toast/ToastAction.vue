<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastAction, type ToastActionProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastAction v-bind="delegatedProps" :class="cn('sp-inline-flex sp-h-8 sp-shrink-0 sp-items-center sp-justify-center sp-rounded-md sp-border sp-bg-transparent sp-px-3 sp-text-sm sp-font-medium sp-ring-offset-background sp-transition-colors hover:sp-bg-secondary focus:sp-outline-none focus:sp-ring-2 focus:sp-ring-ring focus:sp-ring-offset-2 disabled:sp-pointer-events-none disabled:sp-opacity-50 group-[.destructive]:sp-border-muted/40 group-[.destructive]:hover:sp-border-destructive/30 group-[.destructive]:hover:sp-bg-destructive group-[.destructive]:hover:sp-text-destructive-foreground group-[.destructive]:focus:sp-ring-destructive', props.class)">
    <slot />
  </ToastAction>
</template>
