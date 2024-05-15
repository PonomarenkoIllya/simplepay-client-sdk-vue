<template>
    <div class="-sp-ml-9 sp-flex sp-justify-between sp-w-full sp-items-center">
        <div class="sp-w-max">
            <svg class="sp-animate-spin sp-size-6 sp-text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="sp-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="sp-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>

        <p v-if="store.widgetObject.step === 'connectWallet'" class="sp-ml-auto sp-w-max sp-text-xs sp-font-bold">Awaiting for invoice<br/> creating</p>
        <p v-if="store.widgetObject.step === 'payment'" class="sp-ml-auto sp-w-max sp-text-xs sp-font-bold">Awaiting for payment <br/>in blockchain</p>
        <p v-if="store.widgetObject.step === 'processing'" class="sp-ml-auto sp-w-max sp-text-xs sp-font-bold">Processing transaction<br/> confirmations</p>
   
        </div>
</template>

<script setup>
    import {useWidgetStore} from "../../pinia";

    const store = useWidgetStore();
</script>