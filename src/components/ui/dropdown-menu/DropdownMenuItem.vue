<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="cn(
      'sp-relative sp-flex sp-cursor-default sp-select-none sp-items-center sp-rounded-sm sp-px-2 sp-py-1.5 sp-text-sm sp-outline-none sp-transition-colors focus:sp-bg-accent focus:sp-text-accent-foreground data-[disabled]:sp-pointer-events-none data-[disabled]:sp-opacity-50',
      inset && 'sp-pl-8',
      props.class,
    )"
  >
    <slot />
  </DropdownMenuItem>
</template>
