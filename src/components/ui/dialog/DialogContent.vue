<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="sp-fixed sp-inset-0 sp-z-50 sp-bg-black/80  data-[state=open]:sp-animate-in data-[state=closed]:sp-animate-out data-[state=closed]:sp-fade-out-0 data-[state=open]:sp-fade-in-0"
    />
    <DialogContent
        id="simplePayModalContainer"
      v-bind="forwarded"
      :class="
        cn(
          'sp-fixed sp-left-1/2 sp-top-1/2 sp-z-50 sp-grid sp-w-full sp-max-w-lg -sp-translate-x-1/2 -sp-translate-y-1/2 sp-gap-4 sp-border sp-bg-background sp-p-0 sp-shadow-lg sp-duration-200 data-[state=open]:sp-animate-in data-[state=closed]:sp-animate-out data-[state=closed]:sp-fade-out-0 data-[state=open]:sp-fade-in-0 data-[state=closed]:sp-zoom-out-95 data-[state=open]:sp-zoom-in-95 data-[state=closed]:sp-slide-out-to-left-1/2 data-[state=closed]:sp-slide-out-to-top-[48%] data-[state=open]:sp-slide-in-from-left-1/2 data-[state=open]:sp-slide-in-from-top-[48%] sm:sp-rounded-lg',
          props.class,
        )"
    >
      <slot />

      <DialogClose
        class="sp-absolute sp-right-4 sp-top-4 sp-rounded-sm sp-opacity-70 sp-ring-offset-background sp-transition-opacity hover:sp-opacity-100 focus:sp-outline-none focus:sp-ring-2 focus:sp-ring-ring focus:sp-ring-offset-2 disabled:sp-pointer-events-none data-[state=open]:sp-bg-accent data-[state=open]:sp-text-muted-foreground"
      >
        <X class="sp-w-4 sp-h-4" />
        <span class="sp-sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
