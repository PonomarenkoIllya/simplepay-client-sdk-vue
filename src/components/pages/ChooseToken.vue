<template>
    <div class="sp-flex sp-flex-col">

        <template v-if="state.tokens === 'loading'">
            <Loader />
        </template>
        <template v-else-if="state.tokens !== 'loading' && state.tokens.length > 0">
            <div class="sp-max-h-[400px] sp-overflow-y-auto sp-p-2 md:sp-py-0 md:sp-px-1 lg:sp-max-h-full sp-flex sp-flex-col sp-gap-y-2">

                <TokenItem v-for="token in state.tokens" :token="token" :key="token.id" />

            </div>
        </template>

    </div>
</template>

<script setup>
    import Loader from './Loader.vue';
    import TokenItem from '../ui/TokenItem.vue';
    import { reactive, onMounted } from 'vue'

    const state = reactive({
        tokens: 'loading'
    })

    const getTokens = async () => {
        const tokens = await fetch('https://rates.simplepay.ai/tokens').then(data => data.json())
        state.tokens = [...tokens];
    }

    onMounted(async () => {
        await getTokens();
    })
</script>