<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span :class="cn('sp-ml-auto sp-text-xs sp-tracking-widest sp-opacity-60', props.class)">
    <slot />
  </span>
</template>
