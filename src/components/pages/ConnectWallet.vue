<template>
    <div class="flex flex-col pb-4 md:pb-0 pt-4 md:pt-0">
        
        <Label class="pb-4">
            <p>Enter your wallet address:</p>
            <Input :placeholder="state.inputPlaceholder" 
                    class="mt-2" 
                    v-model="inputValue"
                    @blur="inputBlur"
            />
            <p class="mt-2 text-muted-foreground text-xs">Enter the address of the wallet you will use to complete the payment. We need this to track and verify the on-chain transaction as our service is fully decentralised</p>
        </Label>

        <Separator />

        <p class="mt-4 font-bold text-lg">Payment details:</p>

        <div class="flex flex-col gap-y-2 mt-2 text-muted-foreground">
            <div class="flex gap-x-2">
                <p class="text-sm font-bold">Network:</p>
                <p class="text-sm capitalize">{{ store.widgetObject.token?.network }}</p>
            </div>
            <div class="flex gap-x-2">
                <p class="text-sm font-bold">Token:</p>
                <div class="flex gap-x-2 items-center">
                    <img :src="store.widgetObject.token?.img" class="size-4 rounded-full border bg-secondary" />
                    <div class="flex gap-x-2 items-center">
                        <p class="text-sm capitalize">{{ store.widgetObject.token?.symbol }}</p>
                        <div v-if="store.widgetObject.token?.type !== 'native'" class="text-muted-foreground font-bold py-[2px] bg-secondary px-1 border rounded text-xs">{{ store.widgetObject.token?.type }}</div>
                    </div>
                </div>
            </div>
            <div class="flex gap-x-2">
                <p class="text-sm font-bold">Amount:</p>
                    <p class="text-sm capitalize">

                        {{ Number( store.widgetObject.product.price / store.widgetObject.token.price ).toFixed(store.widgetObject.token.stable ? 2 : 8) }}
                        
                        {{ store.widgetObject.token?.symbol }}
                    </p>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-sm font-bold">From:</p>
                <p class="text-xs capitalize" :class="{ 'font-bold text-muted-foreground': store.widgetObject.address }">
                    {{ (store.widgetObject.address) ? store.widgetObject.address : "Please provide your payment address." }}
                </p>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { reactive, computed, onMounted, ref, watch } from 'vue'
    import {useWidgetStore} from '../../pinia'
    import { Label } from '@/components/ui/label'
    import { Input } from '@/components/ui/input'
    import { Separator } from '@/components/ui/separator'

    const store = useWidgetStore();

    const state = reactive({
        windowWidth: window.innerWidth,
        inputPlaceholder: `Your ${store.widgetObject.token?.network} ${store.widgetObject.token?.type !== 'native' ? store.widgetObject.token?.type : ""} wallet address`, 
    })

    const inputValue = ref( store.widgetObject.token.address || '' );

    const isDesktop = computed(() => {
        return state.windowWidth > 768;
    })

    onMounted(async () => {
        window.addEventListener('resize', () => {
            state.windowWidth = window.innerWidth
        })
    })

    watch(inputValue, async (newValue) => {
        window.simpleModal.setAddress(newValue);
        store.update(window.simpleModal);
    })

    function inputBlur(){
        if (!isDesktop) {

            window.simpleModal.closeModal();

            setTimeout(() => {
                window.simpleModal.openModal()
            }, 0)
        }
    }
</script>