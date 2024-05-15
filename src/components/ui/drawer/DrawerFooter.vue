<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HtmlHTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('sp-mt-auto sp-flex sp-flex-col sp-gap-2 sp-p-4', props.class)">
    <slot />
  </div>
</template>
