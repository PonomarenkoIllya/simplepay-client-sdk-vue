<template>
    <header class="flex justify-between items-center border-b py-4 w-full px-4">
        
        <div class="flex gap-x-4 items-center">

            <template v-if="store.widgetObject.step === 'connectWallet' || store.widgetObject.step === 'setPrice'">
                <div @click="ReturnBack" class="hover:bg-secondary cursor-pointer flex items-center justify-center size-8 rounded-full border">
                    <ArrowLeft class="size-4" />
                </div>
            </template>

            <p v-if="store.widgetObject.step === 'chooseToken'" class="text-xl font-bold">
                Choose token
            </p>
            <p v-if="store.widgetObject.step === 'setPrice'" class="text-xl font-bold">
                Enter the amount
            </p>
            <p v-if="store.widgetObject.step === 'connectWallet'" class="text-xl font-bold">
                Connect wallet
            </p>
            <p v-if="store.widgetObject.step === 'payment'" class="text-xl font-bold">
                Awaiting for Payment
            </p>
            <p v-if="store.widgetObject.step === 'processing'" class="text-xl font-bold">
                Proсessing transaction
            </p>
            <p v-if="store.widgetObject.step === 'success'" class="text-xl font-bold">
                Success transaction
            </p>

        </div>

    </header>

</template>

<script setup>
    import { ArrowLeft } from 'lucide-vue-next';
    import {useWidgetStore} from '../pinia'

    const store = useWidgetStore();

    function ReturnBack(){
        window.simpleModal.setStep('chooseToken')
        store.update(window.simpleModal);   
    }

</script>