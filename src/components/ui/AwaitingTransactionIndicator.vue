<template>
    <div class="-ml-9 flex justify-between w-full items-center">
        <div class="w-max">
            <svg class="animate-spin size-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>

        <p v-if="store.widgetObject.step === 'connectWallet'" class="ml-auto w-max text-xs font-bold">Awaiting for invoice<br/> creating</p>
        <p v-if="store.widgetObject.step === 'payment'" class="ml-auto w-max text-xs font-bold">Awaiting for payment <br/>in blockchain</p>
        <p v-if="store.widgetObject.step === 'processing'" class="ml-auto w-max text-xs font-bold">Processing transaction<br/> confirmations</p>
   
        </div>
</template>

<script setup>
    import {useWidgetStore} from "../../pinia";

    const store = useWidgetStore();
</script>