<template>

    <template v-if="!store.widgetObject.invoice">
        <Loader />
    </template>
    <template v-else>

        <div class="sp-pb-4 lg:sp-pb-2 sp-flex sp-flex-col sp-items-center">
            <div class="sp-flex sp-items-center sp-gap-x-4 sp-mt-4 lg:sp-mt-1">
                <div class="sp-flex sp-gap-x-2 sp-items-center">
                    <p class="sp-text-sm sp-font-bold sp-text-muted-foreground">Network:</p>
                    <p class="sp-text-sm sp-capitalize sp-font-bold">{{ store.widgetObject.invoice.token?.network }}</p>
                </div>
                <div class="sp-flex sp-gap-x-2 sp-items-center">
                    <p class="sp-text-sm sp-font-bold sp-text-muted-foreground">Token:</p>
                    <div class="sp-flex sp-gap-x-2 sp-items-center">
                        <p class="sp-text-sm sp-capitalize sp-font-bold">{{ store.widgetObject.invoice.token?.symbol }}</p>

                        <div v-if="store.widgetObject.invoice.token?.type !== 'native'" class="sp-text-muted-foreground sp-font-bold sp-py-[2px] sp-bg-secondary sp-px-1 sp-border sp-rounded sp-text-xs">{{ store.widgetObject.token?.type }}</div>

                    </div>
                </div>
            </div>
            <div class="sp-relative sp-rounded-xl sp-size-64">

                <qrcode-vue class="sp-p-4"
                            :background="[ (themeMode === 'dark') ? '#000' : '#fff' ]"
                            :foreground="[ (themeMode === 'dark') ? '#fff' : '#000' ]"
                            :value="store.widgetObject.invoice.to"
                            :size="256"
                            level="H" />

                <img :src="store.widgetObject.invoice.token?.img" class="sp-absolute sp-translate-center sp-top-1/2 sp-left-1/2 sp-size-14 sp-border sp-rounded-full sp-object-cover" />
            </div>
            <Separator class="sp-mb-2" />
            <Label class="sp-pt-2 sp-w-full sp-cursor-pointer">
                <p class="sp-text-sm sp-text-muted-foreground sp-font-bold">Address to pay:</p>
                <div
                    class="sp-mt-1 sp-border sp-rounded-lg sp-px-3 sp-py-2 sp-flex sp-justify-between sp-items-center sp-gap-x-4"
                >
                    <p class="sp-w-full sp-truncate sp-font-bold sp-text-sm sp-max-w-52">{{ store.widgetObject.invoice?.to }}</p>

                    <CopyButton :copyText="store.widgetObject.invoice?.to"/>

                </div>
            </Label>
            <Label class="sp-pt-2 sp-mt-2 sp-w-full sp-cursor-pointer">
                <p class="sp-text-sm sp-text-muted-foreground sp-font-bold">Amount:</p>
                <div
                    class="sp-mt-1 sp-border sp-rounded-lg sp-px-3 sp-py-2 sp-flex sp-justify-between sp-items-center sp-gap-x-4"
                >
                    <p class="sp-w-full sp-truncate sp-font-bold sp-text-sm">
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