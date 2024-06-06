<template>
    <header class="sp-flex sp-justify-between sp-items-center sp-border-b sp-py-4 sp-w-full sp-px-4">
        
        <div class="sp-flex sp-gap-x-4 sp-items-center">

            <div v-if="store.widgetObject.step === 'connectWallet' && store.widgetObject.isPriceEmpty"
                 @click="GoToStep('setPrice')"
                 class="hover:sp-bg-secondary sp-cursor-pointer sp-flex sp-items-center sp-justify-center sp-size-8 sp-rounded-full sp-border"
            >
                <ArrowLeft class="sp-size-4" />
            </div>

            <div v-if="store.widgetObject.step === 'connectWallet' && !store.widgetObject.isPriceEmpty"
                 @click="GoToStep('chooseToken')"
                 class="hover:sp-bg-secondary sp-cursor-pointer sp-flex sp-items-center sp-justify-center sp-size-8 sp-rounded-full sp-border"
            >
                <ArrowLeft class="sp-size-4" />
            </div>

            <div v-if="store.widgetObject.step === 'setPrice'"
                 @click="GoToStep('chooseToken')"
                 class="hover:sp-bg-secondary sp-cursor-pointer sp-flex sp-items-center sp-justify-center sp-size-8 sp-rounded-full sp-border"
            >
                <ArrowLeft class="sp-size-4" />
            </div>

            <div v-if="store.widgetObject.step === 'chooseToken' && store.widgetObject.isEmailEmpty"
                 @click="GoToStep('setEmail')"
                 class="hover:sp-bg-secondary sp-cursor-pointer sp-flex sp-items-center sp-justify-center sp-size-8 sp-rounded-full sp-border"
            >
                <ArrowLeft class="sp-size-4" />
            </div>

            <p v-if="store.widgetObject.step === 'setEmail'" class="sp-text-xl sp-font-bold">
                Enter email
            </p>
            <p v-if="store.widgetObject.step === 'chooseToken'" class="sp-text-xl sp-font-bold">
                Choose token
            </p>
            <p v-if="store.widgetObject.step === 'setPrice'" class="sp-text-xl sp-font-bold">
                Enter the amount
            </p>
            <p v-if="store.widgetObject.step === 'connectWallet'" class="sp-text-xl sp-font-bold">
                Connect wallet
            </p>
            <p v-if="store.widgetObject.step === 'payment'" class="sp-text-xl sp-font-bold">
                Awaiting for Payment
            </p>
            <p v-if="store.widgetObject.step === 'processing'" class="sp-text-xl sp-font-bold">
                Proсessing transaction
            </p>
            <p v-if="store.widgetObject.step === 'success'" class="sp-text-xl sp-font-bold">
                Success transaction
            </p>

        </div>

    </header>

</template>

<script setup>
    import { ArrowLeft } from 'lucide-vue-next';
    import {useWidgetStore} from '../pinia'

    const store = useWidgetStore();

    function GoToStep(stepName){
        window.simpleModal.setStep(stepName)
        store.update(window.simpleModal);   
    }

</script>