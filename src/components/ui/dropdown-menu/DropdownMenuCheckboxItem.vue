<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuCheckboxItem,
  type DropdownMenuCheckboxItemEmits,
  type DropdownMenuCheckboxItemProps,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from 'radix-vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    :class=" cn(
      'sp-relative sp-flex sp-cursor-default sp-select-none sp-items-center sp-rounded-sm sp-py-1.5 sp-pl-8 sp-pr-2 sp-text-sm sp-outline-none sp-transition-colors focus:sp-bg-accent focus:sp-text-accent-foreground data-[disabled]:sp-pointer-events-none data-[disabled]:sp-opacity-50',
      props.class,
    )"
  >
    <span class="sp-absolute sp-left-2 sp-flex sp-h-3.5 sp-w-3.5 sp-items-center sp-justify-center">
      <DropdownMenuItemIndicator>
        <Check class="sp-w-4 sp-h-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
