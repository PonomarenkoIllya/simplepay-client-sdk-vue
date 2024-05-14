<template>
    <Button @click="mode = (mode === 'light') ? 'dark' : 'light'">
        <Sun v-if="mode === 'dark'"/>
        <Moon v-else/>
    </Button>
</template>

<script setup lang="ts">
    import { Sun, Moon } from 'lucide-vue-next';
    import { useColorMode } from '@vueuse/core'
    import { Button } from '@/components/ui/button'

    let mode = useColorMode();

</script>