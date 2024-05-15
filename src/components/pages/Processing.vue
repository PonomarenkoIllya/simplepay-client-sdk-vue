<template>
    <div class="sp-flex sp-flex-col sp-mb-4 sp-pt-4 md:sp-pt-0">

        <div class="sp-flex sp-items-start sp-justify-between sp-mb-4">
            <div class="sp-flex">
                <div class="sp-relative sp-flex sp-flex-col sp-mt-4 sp-h-28">
                    <div class="sp-w-[1px] sp-bg-border sp-h-32"></div>
                    <div class="sp-absolute sp-top-0 sp-size-2 sp-rounded-full sp-bg-green-400 -sp-translate-x-1/2"></div>
                    <div class="sp-absolute sp-top-1/2 sp-size-2 sp-rounded-full -sp-translate-x-1/2 -sp-translate-y-1/2 sp-bg-orange-400"></div>
                    <div class="sp-absolute sp-bottom-0 sp-size-2 sp-rounded-full -sp-translate-x-1/2 sp-bg-border"></div>
                </div>
                <div class="sp-flex sp-flex-col sp-ml-4">
                    <div class="sp-flex sp-flex-col">
                        <p class="sp-text-sm">Payment success</p>
                        <p v-if="state.TxData" class="sp-text-muted-foreground sp-text-xs">
                            {{ `${new Date(state.TxData.timestamp).toLocaleTimeString()}, ${new Date(state.TxData.timestamp).toLocaleDateString()}` }}
                        </p>
                    </div>
                    <div class="sp-flex sp-flex-col sp-mt-5">
                        <p class="sp-text-sm">
                            Transfer in progress
                        </p>

                        <p v-if="state.TxData && store.widgetObject.invoice" class="sp-text-muted-foreground sp-text-xs">
                            {{  `${state.TxData.confirmations} / ${getConfirmationsCount()}`  }}
                        </p>

                    </div>
                    <div class="sp-flex sp-flex-col sp-mt-4">
                        <p class="sp-text-sm">Payment complete</p>
                        <p class="sp-text-muted-foreground sp-text-xs">
                            Awaiting
                        </p>
                    </div>
                </div>
            </div>
            <div class="sp-flex sp-flex-col sp-h-36 sp-items-center sp-justify-center sp-my-4">
                <div class="sp-relative sp-flex sp-items-center sp-justify-between sp-rounded-xl">

                    <template v-if="store.widgetObject.invoice === null">
                        <Skeleton class="sp-size-36" />
                    </template>
                    <template v-else>
                        <qrcode-vue class="sp-size-36"
                                    :background="getQRBackground()"
                                    :foreground="getQRForeground()"
                                    :value="getExplorerLink()"
                                    :size="150"
                                    level="H" />
                    </template>

                </div>
            </div>
        </div>
        <Separator />
        <div class="sp-w-full sp-h-24 sp-flex sp-flex-col sp-mt-4">
            <p class="sp-text-lx sp-text-muted-foreground sp-font-bold sp-pb-4">Approximate time to estimate:</p>
            <LoaderComponent v-if="store.widgetObject.invoice" :totalBlocks="getConfirmationsCount()" />
        </div>
        <Separator />
        <div class="sp-flex sp-flex-col sp-mt-4">
            <p class="sp-font-bold sp-text-muted-foreground">Transaction details:</p>
            <div class="sp-flex sp-flex-col sp-gap-y-2 sp-w-full sp-rounded sp-mt-2">
                <div class="sp-flex sp-justify-between sp-items-center sp-w-full">
                    <p class="sp-text-muted-foreground sp-text-xs">Network:</p>
                    <p class="sp-text-xs sp-capitalize sp-font-bold">
                        {{ store.widgetObject.invoice.token?.network }}
                    </p>
                </div>
                <div class="sp-flex sp-justify-between sp-items-center sp-w-full">
                    <p class="sp-text-muted-foreground sp-text-xs">Token:</p>
                    <div class="sp-flex sp-gap-x-2 sp-items-center">
                        <img class="sp-size-4 sp-rounded-full sp-object-cover sp-border" :src="store.widgetObject.invoice.token?.img" :alt="store.widgetObject.invoice.token?.symbol" />
                        <p class="sp-text-xs sp-font-bold">
                            {{ `${store.widgetObject.invoice.token?.symbol} ${ (store.widgetObject.invoice.token?.type !== 'native') ? store.widgetObject.invoice.token?.type : ''}` }}
                        </p>
                    </div>
                </div>
                <div class="sp-flex sp-justify-between sp-items-center sp-w-full">
                    <p class="sp-text-muted-foreground sp-text-xs">Amount:</p>
                    <p class=" sp-text-xs sp-font-bold">
                        {{ `${store.widgetObject.invoice?.token.amount} ${store.widgetObject.invoice.token?.symbol}` }}
                    </p>
                </div>
                <div class="sp-flex sp-justify-between sp-items-center sp-w-full">
                    <p class="sp-text-muted-foreground sp-text-xs">Transaction ID:</p>

                    <CopyButton :copyText="store.widgetObject.invoice.transactionId"/>

                </div>

                <div class="sp-flex sp-justify-between sp-items-center sp-w-full">
                    <p class="sp-text-muted-foreground sp-text-xs">Transaction Explorer</p>

                    <a target="_blank" :href="getExplorerLink()">
                        <button class="sp-flex sp-gap-x-2 sp-items-center group sp-cursor-pointer">
                            <div class="sp-flex sp-gap-x-2 sp-items-center">

                                <p class="sp-text-xs sp-text-green-500 sp-font-bold group-hover:sp-underline">

                                    {{ getExplorerName() }}

                                </p>
                            </div>
                            <SquareArrowOutUpRight class="sp-w-3 sp-h-3 sp-text-green-500 sp-font-bold group-hover:sp-underline" stroke-width="1.5" />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import LoaderComponent from '../ui/LoaderComponent.vue'
import QrcodeVue from 'qrcode.vue'
import {useWidgetStore} from '../../pinia'
import { SquareArrowOutUpRight } from 'lucide-vue-next';
import { useColorMode } from '@vueuse/core'
import {SimplePayClient} from 'simplepay-client-sdk-v2';
import CopyButton from "@/components/ui/CopyButton.vue";

const store = useWidgetStore();
let themeMode:any = useColorMode();
const state = reactive({
    TxData: null as any
});

const getQRBackground = () => {
    return (themeMode === 'dark') ? '#000' : '#fff';
}
const getQRForeground = () => {
    return (themeMode === 'dark') ? '#fff' : '#000';
}

const getExplorerName = () => {

    let result;

    switch(store.widgetObject?.invoice?.token?.network) {
        case 'bsc':
            result = 'bscsan.com';
            break;
        case 'bitcoin':
            result = 'blockchair.com';
            break;
        case 'litecoin':
            result = 'blockchair.com';
            break;
        case 'tron':
            result = 'tronscan.org';
            break;
        default:
            result = 'etherscan.io';
            break;
    }

    return result;
}
const getExplorerLink = () => {

    let result;

    switch(store.widgetObject?.invoice?.token?.network) {
        case 'bsc':
            result = `https://bscscan.com/tx/${store.widgetObject?.invoice?.transactionId}`;
            break;
        case 'bitcoin':
            result = `https://blockchair.com/bitcoin/transaction/${store.widgetObject?.invoice?.transactionId}`;
            break;
        case 'litecoin':
            result = `https://blockchair.com/litecoin/transaction/`;
            break;
        case 'tron':
            result = `https://tronscan.org/#/transaction/${store.widgetObject?.invoice?.transactionId}`;
            break;
        default:
            result = `https://etherscan.io/tx/${store.widgetObject?.invoice?.transactionId}`;
            break;
    }

    return result;
}
const getConfirmationsCount = () => {

    let result;

    switch(store.widgetObject?.invoice?.token?.network) {
        case 'bsc':
            result = 17;
            break;
        case 'ethereum':
            result = 3;
            break;
        case 'bitcoin':
            result = 3;
            break;
        case 'litecoin':
            result = 7;
            break;
        case 'tron':
            result = 21;
            break;
        default:
            result = 21;
            break;
    }

    return result;

}

let intervalRef:any = ref( null );

function InvoiceSuccessCallback(invoice:any){

    window.simpleModal.setInvoiceId(invoice.invoiceId);
    window.simpleModal.setInvoice(invoice);

    store.update(window.simpleModal);
    clearInterval(intervalRef.current);

    window.simpleModal.setStep('success');
    store.update(window.simpleModal);

}

onMounted(async () => {
    const sp = new SimplePayClient(store.widgetObject.merchantId, store.widgetObject.projectId);
    //описатся от InvoiceProcessing
    sp.subscribe('InvoiceSuccess', (invoice:any) => { InvoiceSuccessCallback(invoice) });

    intervalRef.current = setInterval(async () => {

        let result:any = await sp.getTxData(store.widgetObject.invoice.token.id, store.widgetObject.invoice.transactionId);

        if(result){
            state.TxData = result;
            store.setLoaderComponentNumber(result.confirmations);
        }

    }, 3000)

})
</script>