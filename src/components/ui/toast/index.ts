import type { ToastRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

export { default as Toaster } from './Toaster.vue'
export { default as Toast } from './Toast.vue'
export { default as ToastViewport } from './ToastViewport.vue'
export { default as ToastAction } from './ToastAction.vue'
export { default as ToastClose } from './ToastClose.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as ToastProvider } from './ToastProvider.vue'
export { toast, useToast } from './use-toast'

import { type VariantProps, cva } from 'class-variance-authority'

export const toastVariants = cva(
  'group sp-pointer-events-auto sp-relative sp-flex sp-w-full sp-items-center sp-justify-between sp-gap-x-4 sp-overflow-hidden sp-rounded-md sp-border sp-p-6 sp-pr-8 sp-shadow-lg sp-transition-all data-[swipe=cancel]:sp-translate-x-0 data-[swipe=end]:sp-translate-x-[--radix-toast-swipe-end-x] data-[swipe=move]:sp-translate-x-[--radix-toast-swipe-move-x] data-[swipe=move]:sp-transition-none data-[state=open]:sp-animate-in data-[state=closed]:sp-animate-out data-[swipe=end]:sp-animate-out data-[state=closed]:sp-fade-out-80 data-[state=closed]:sp-slide-out-to-right-full data-[state=open]:sp-slide-in-from-top-full data-[state=open]:sm:sp-slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'sp-border sp-bg-background sp-text-foreground',
        destructive:
                    'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type ToastVariants = VariantProps<typeof toastVariants>

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}
