<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  useForwardPropsEmits,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuSubContent
    v-bind="forwarded"
    :class="cn('sp-z-50 sp-min-w-32 sp-overflow-hidden sp-rounded-md sp-border sp-bg-popover sp-p-1 sp-text-popover-foreground sp-shadow-lg data-[state=open]:sp-animate-in data-[state=closed]:sp-animate-out data-[state=closed]:sp-fade-out-0 data-[state=open]:sp-fade-in-0 data-[state=closed]:sp-zoom-out-95 data-[state=open]:sp-zoom-in-95 data-[side=bottom]:sp-slide-in-from-top-2 data-[side=left]:sp-slide-in-from-right-2 data-[side=right]:sp-slide-in-from-left-2 data-[side=top]:sp-slide-in-from-bottom-2', props.class)"
  >
    <slot />
  </DropdownMenuSubContent>
</template>
