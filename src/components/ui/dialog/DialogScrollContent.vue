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
      class="sp-fixed sp-inset-0 sp-z-50 sp-grid sp-place-items-center sp-overflow-y-auto sp-bg-black/80  data-[state=open]:sp-animate-in data-[state=closed]:sp-animate-out data-[state=closed]:sp-fade-out-0 data-[state=open]:sp-fade-in-0"
    >
      <DialogContent
        :class="
          cn(
            'sp-relative sp-z-50 sp-grid sp-w-full sp-max-w-lg sp-my-8 sp-gap-4 sp-border sp-border-border sp-bg-background sp-p-6 sp-shadow-lg sp-duration-200 sm:sp-rounded-lg md:sp-w-full',
            props.class,
          )
        "
        v-bind="forwarded"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose
          class="sp-absolute sp-top-3 sp-right-3 sp-p-0.5 sp-transition-colors sp-rounded-md hover:sp-bg-secondary"
        >
          <X class="sp-w-4 sp-h-4" />
          <span class="sp-sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
