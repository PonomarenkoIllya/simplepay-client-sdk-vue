<template>

    <template v-if="!store.widgetObject.invoice">
        <Loader />
    </template>
    <template v-else>

        <div class="pb-4 lg:pb-2 flex flex-col items-center">
            <div class="flex items-center gap-x-4 mt-4 lg:mt-1">
                <div class="flex gap-x-2 items-center">
                    <p class="text-sm font-bold text-muted-foreground">Network:</p>
                    <p class="text-sm capitalize font-bold">{{ store.widgetObject.invoice.token?.network }}</p>
                </div>
                <div class="flex gap-x-2 items-center">
                    <p class="text-sm font-bold text-muted-foreground">Token:</p>
                    <div class="flex gap-x-2 items-center">
                        <p class="text-sm capitalize font-bold">{{ store.widgetObject.invoice.token?.symbol }}</p>

                        <div v-if="store.widgetObject.invoice.token?.type !== 'native'" class="text-muted-foreground font-bold py-[2px] bg-secondary px-1 border rounded text-xs">{{ store.widgetObject.token?.type }}</div>

                    </div>
                </div>
            </div>
            <div class="relative rounded-xl size-64">

                <qrcode-vue class="p-4"
                            :background="[ (themeMode === 'dark') ? '#000' : '#fff' ]"
                            :foreground="[ (themeMode === 'dark') ? '#fff' : '#000' ]"
                            :value="store.widgetObject.invoice.to"
                            :size="256"
                            level="H" />

                <img :src="store.widgetObject.invoice.token?.img" class="absolute translate-center top-1/2 left-1/2 size-14 border rounded-full object-cover" />
            </div>
            <Separator class="mb-2" />
            <Label class="pt-2 w-full cursor-pointer">
                <p class="text-sm text-muted-foreground font-bold">Address to pay:</p>
                <div
                    class="mt-1 border rounded-lg px-3 py-2 flex justify-between items-center gap-x-4"
                >
                    <p class="w-full truncate font-bold text-sm max-w-52">{{ store.widgetObject.invoice?.to }}</p>

                    <CopyButton :copyText="store.widgetObject.invoice?.to"/>

                </div>
            </Label>
            <Label class="pt-2 mt-2 w-full cursor-pointer">
                <p class="text-sm text-muted-foreground font-bold">Amount:</p>
                <div
                    class="mt-1 border rounded-lg px-3 py-2 flex justify-between items-center gap-x-4"
                >
                    <p class="w-full truncate font-bold text-sm">
                        {{ store.widgetObject.invoice.token.amount }}
                        {{ store.widgetObject.invoice.token.symbol }}
                    </p>

                    <CopyButton :copyText="store.widgetObject.invoice.token.amount"/>

                </div>
            </Label>
        </div>

    </template>

</template>

<script setup>
import {useWidgetStore} from '../../pinia'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Loader from './Loader.vue';
import { useColorMode } from '@vueuse/core'
import { onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
import {SimplePayClient} from 'simplepay-client-sdk-v2';
import CopyButton from "@/components/ui/CopyButton.vue";

const store = useWidgetStore();
let themeMode = useColorMode();

function InvoiceProcessingCallback(invoice){

    window.simpleModal.setInvoiceId(invoice.invoiceId);
    window.simpleModal.setInvoice(invoice);

    store.update(window.simpleModal);

    window.simpleModal.setStep('processing');
    store.update(window.simpleModal);

}

onMounted(async () => {

    const sp = new SimplePayClient(store.widgetObject.merchantId, store.widgetObject.projectId);
    sp.subscribe('InvoiceProcessing', (invoice) => { InvoiceProcessingCallback(invoice) });

})

</script>