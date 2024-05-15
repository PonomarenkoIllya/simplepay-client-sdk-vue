<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Separator, type SeparatorProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="cn('sp-shrink-0 sp-bg-border', props.orientation === 'vertical' ? 'sp-w-px sp-h-full' : 'sp-h-px sp-w-full', props.class)"
  />
</template>
