<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue'
import ScrollBar from './ScrollBar.vue'
import { cn } from '@/lib/utils'

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('sp-relative sp-overflow-hidden', props.class)">
    <ScrollAreaViewport class="sp-h-full sp-w-full sp-rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
