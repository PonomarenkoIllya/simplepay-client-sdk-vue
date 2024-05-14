<template>
    <div class="flex flex-col mb-4 pt-4 md:pt-0">

        <div class="flex items-start justify-between mb-4">
            <div class="flex">
                <div class="relative flex flex-col mt-4 h-28">
                    <div class="w-[1px] bg-border h-32"></div>
                    <div class="absolute top-0 size-2 rounded-full bg-green-400 -translate-x-1/2"></div>
                    <div class="absolute top-1/2 size-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-orange-400"></div>
                    <div class="absolute bottom-0 size-2 rounded-full -translate-x-1/2 bg-border"></div>
                </div>
                <div class="flex flex-col ml-4">
                    <div class="flex flex-col">
                        <p class="text-sm">Payment success</p>
                        <p v-if="state.TxData" class="text-muted-foreground text-xs">
                            {{ `${new Date(state.TxData.timestamp).toLocaleTimeString()}, ${new Date(state.TxData.timestamp).toLocaleDateString()}` }}
                        </p>
                    </div>
                    <div class="flex flex-col mt-5">
                        <p class="text-sm">
                            Transfer in progress
                        </p>

                        <p v-if="state.TxData && store.widgetObject.invoice" class="text-muted-foreground text-xs">
                            {{  `${state.TxData.confirmations} / ${getConfirmationsCount()}`  }}
                        </p>

                    </div>
                    <div class="flex flex-col mt-4">
                        <p class="text-sm">Payment complete</p>
                        <p class="text-muted-foreground text-xs">
                            Awaiting
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col h-36 items-center justify-center my-4">
                <div class="relative flex items-center justify-between rounded-xl">

                    <template v-if="store.widgetObject.invoice === null">
                        <Skeleton class="size-36" />
                    </template>
                    <template v-else>
                        <qrcode-vue class="size-36"
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
        <div class="w-full h-24 flex flex-col mt-4">
            <p class="text-lx text-muted-foreground font-bold pb-4">Approximate time to estimate:</p>
            <LoaderComponent v-if="store.widgetObject.invoice" :totalBlocks="getConfirmationsCount()" />
        </div>
        <Separator />
        <div class="flex flex-col mt-4">
            <p class="font-bold text-muted-foreground">Transaction details:</p>
            <div class="flex flex-col gap-y-2 w-full rounded mt-2">
                <div class="flex justify-between items-center w-full">
                    <p class="text-muted-foreground text-xs">Network:</p>
                    <p class="text-xs capitalize font-bold">
                        {{ store.widgetObject.invoice.token?.network }}
                    </p>
                </div>
                <div class="flex justify-between items-center w-full">
                    <p class="text-muted-foreground text-xs">Token:</p>
                    <div class="flex gap-x-2 items-center">
                        <img class="size-4 rounded-full object-cover border" :src="store.widgetObject.invoice.token?.img" :alt="store.widgetObject.invoice.token?.symbol" />
                        <p class="text-xs font-bold">
                            {{ `${store.widgetObject.invoice.token?.symbol} ${ (store.widgetObject.invoice.token?.type !== 'native') ? store.widgetObject.invoice.token?.type : ''}` }}
                        </p>
                    </div>
                </div>
                <div class="flex justify-between items-center w-full">
                    <p class="text-muted-foreground text-xs">Amount:</p>
                    <p class=" text-xs font-bold">
                        {{ `${store.widgetObject.invoice?.token.amount} ${store.widgetObject.invoice.token?.symbol}` }}
                    </p>
                </div>
                <div class="flex justify-between items-center w-full">
                    <p class="text-muted-foreground text-xs">Transaction ID:</p>

                    <CopyButton :copyText="store.widgetObject.invoice.transactionId"/>

                </div>

                <div class="flex justify-between items-center w-full">
                    <p class="text-muted-foreground text-xs">Transaction Explorer</p>

                    <a target="_blank" :href="getExplorerLink()">
                        <button class="flex gap-x-2 items-center group cursor-pointer">
                            <div class="flex gap-x-2 items-center">

                                <p class="text-xs text-green-500 font-bold group-hover:underline">

                                    {{ getExplorerName() }}

                                </p>
                            </div>
                            <SquareArrowOutUpRight class="w-3 h-3 text-green-500 font-bold group-hover:underline" stroke-width="1.5" />
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