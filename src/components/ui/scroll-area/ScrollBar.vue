<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps, ScrollAreaThumb } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }>(), {
  orientation: 'vertical',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    :class="
      cn('sp-flex sp-touch-none sp-select-none sp-transition-colors',
         orientation === 'vertical'
           && 'sp-h-full sp-w-2.5 sp-border-l sp-border-l-transparent sp-p-px',
         orientation === 'horizontal'
           && 'sp-h-2.5 sp-flex-col sp-border-t sp-border-t-transparent sp-p-px',
         props.class)"
  >
    <ScrollAreaThumb class="sp-relative sp-flex-1 sp-rounded-full sp-bg-border" />
  </ScrollAreaScrollbar>
</template>
