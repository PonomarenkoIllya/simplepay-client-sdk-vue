<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
  useForwardProps,
} from 'radix-vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="cn(
      'sp-flex sp-cursor-default sp-select-none sp-items-center sp-rounded-sm sp-px-2 sp-py-1.5 sp-text-sm sp-outline-none focus:sp-bg-accent data-[state=open]:sp-bg-accent',
      props.class,
    )"
  >
    <slot />
    <ChevronRight class="sp-ml-auto sp-h-4 sp-w-4" />
  </DropdownMenuSubTrigger>
</template>
