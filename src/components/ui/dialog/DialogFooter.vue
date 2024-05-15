<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn(
        'sp-flex sp-flex-col-reverse sm:sp-flex-row sm:sp-justify-end sm:sp-gap-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
