<script lang="ts" setup>
import { DrawerOverlay } from 'vaul-vue'
import type { DialogOverlayProps } from 'radix-vue'
import { type HtmlHTMLAttributes, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<DialogOverlayProps & { class?: HtmlHTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DrawerOverlay v-bind="delegatedProps" :class="cn('sp-fixed sp-inset-0 sp-z-50 sp-bg-black/80', props.class)" />
</template>
