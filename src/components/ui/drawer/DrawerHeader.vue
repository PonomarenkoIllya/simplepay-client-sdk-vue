<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HtmlHTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('sp-grid sp-gap-1.5 sp-p-4 sp-text-center sm:sp-text-left', props.class)">
    <slot />
  </div>
</template>
