<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('sp-flex sp-flex-col sp-gap-y-1.5 sp-text-center sm:sp-text-left', props.class)"
  >
    <slot />
  </div>
</template>
