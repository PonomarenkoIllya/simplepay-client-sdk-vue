<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuSeparatorProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DropdownMenuSeparator v-bind="delegatedProps" :class="cn('-sp-mx-1 sp-my-1 sp-h-px sp-bg-muted', props.class)" />
</template>
