<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    :class="cn('sp-px-2 sp-py-1.5 sp-text-sm sp-font-semibold', inset && 'sp-pl-8', props.class)"
  >
    <slot />
  </DropdownMenuLabel>
</template>
