<script lang="ts" setup>
import { DrawerContent, DrawerPortal } from 'vaul-vue'
import type { DialogContentEmits, DialogContentProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import type { HtmlHTMLAttributes } from 'vue'
import DrawerOverlay from './DrawerOverlay.vue'
import { cn } from '@/lib/utils'

const props = defineProps<DialogContentProps & { class?: HtmlHTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
        id="simplePayModalContainer"
      v-bind="forwarded" :class="cn(
        'sp-fixed sp-inset-x-0 sp-bottom-0 sp-z-50 sp-mt-24 sp-flex sp-h-auto sp-flex-col sp-rounded-t-[10px] sp-border sp-bg-background sp-p-0',
        props.class,
      )"
    >
      <div class="sp-mx-auto sp-mt-4 sp-h-2 sp-w-[100px] sp-rounded-full sp-bg-muted" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
