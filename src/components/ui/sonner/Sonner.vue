<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="{
      classes: {
        toast: 'group toast group-[.toaster]:sp-bg-background group-[.toaster]:sp-text-foreground group-[.toaster]:sp-border-border group-[.toaster]:sp-shadow-lg',
        description: 'group-[.toast]:sp-text-muted-foreground',
        actionButton:
          'group-[.toast]:sp-bg-primary group-[.toast]:sp-text-primary-foreground',
        cancelButton:
          'group-[.toast]:sp-bg-muted group-[.toast]:sp-text-muted-foreground',
      },
    }"
  />
</template>
