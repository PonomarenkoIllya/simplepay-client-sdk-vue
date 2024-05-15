<template>
    <div class="sp-flex sp-flex-col sp-pb-4 md:sp-pb-0 sp-pt-4 md:sp-pt-0">
        
        <Label class="sp-pb-4">
            <p>Enter your wallet address:</p>
            <Input :placeholder="state.inputPlaceholder" 
                    class="sp-mt-2"
                    v-model="inputValue"
                    @blur="inputBlur"
            />
            <p class="sp-mt-2 sp-text-muted-foreground sp-text-xs">Enter the address of the wallet you will use to complete the payment. We need this to track and verify the on-chain transaction as our service is fully decentralised</p>
        </Label>

        <Separator />

        <p class="sp-mt-4 sp-font-bold sp-text-lg">Payment details:</p>

        <div class="sp-flex sp-flex-col sp-gap-y-2 sp-mt-2 sp-text-muted-foreground">
            <div class="sp-flex sp-gap-x-2">
                <p class="sp-text-sm sp-font-bold">Network:</p>
                <p class="sp-text-sm sp-capitalize">{{ store.widgetObject.token?.network }}</p>
            </div>
            <div class="sp-flex sp-gap-x-2">
                <p class="sp-text-sm sp-font-bold">Token:</p>
                <div class="sp-flex sp-gap-x-2 sp-items-center">
                    <img :src="store.widgetObject.token?.img" class="sp-size-4 sp-rounded-full sp-border sp-bg-secondary" />
                    <div class="sp-flex sp-gap-x-2 sp-items-center">
                        <p class="sp-text-sm sp-capitalize">{{ store.widgetObject.token?.symbol }}</p>
                        <div v-if="store.widgetObject.token?.type !== 'native'" class="sp-text-muted-foreground sp-font-bold sp-py-[2px] sp-bg-secondary sp-px-1 sp-border sp-rounded sp-text-xs">{{ store.widgetObject.token?.type }}</div>
                    </div>
                </div>
            </div>
            <div class="sp-flex sp-gap-x-2">
                <p class="sp-text-sm sp-font-bold">Amount:</p>
                    <p class="sp-text-sm sp-capitalize">

                        {{ Number( store.widgetObject.product.price / store.widgetObject.token.price ).toFixed(store.widgetObject.token.stable ? 2 : 8) }}
                        
                        {{ store.widgetObject.token?.symbol }}
                    </p>
            </div>
            <div class="sp-flex sp-flex-col sp-gap-y-1">
                <p class="sp-text-sm sp-font-bold">From:</p>
                <p class="sp-text-xs sp-capitalize" :class="{ 'sp-font-bold sp-text-muted-foreground': store.widgetObject.address }">
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