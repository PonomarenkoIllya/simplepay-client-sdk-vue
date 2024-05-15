<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useForwardPropsEmits,
} from 'radix-vue'
import { Circle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="cn(
      'sp-relative sp-flex sp-cursor-default sp-select-none sp-items-center sp-rounded-sm sp-py-1.5 sp-pl-8 sp-pr-2 sp-text-sm sp-outline-none sp-transition-colors focus:sp-bg-accent focus:sp-text-accent-foreground data-[disabled]:sp-pointer-events-none data-[disabled]:sp-opacity-50',
      props.class,
    )"
  >
    <span class="sp-absolute sp-left-2 sp-flex sp-h-3.5 sp-w-3.5 sp-items-center sp-justify-center">
      <DropdownMenuItemIndicator>
        <Circle class="sp-h-2 sp-w-2 sp-fill-current" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
