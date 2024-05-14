<template>
    <div class="flex flex-col mb-4 pt-4 md:pt-0">

        <div class="flex items-start justify-between mb-4">
            <div class="flex">
                <div class="relative flex flex-col mt-2 h-28">
                    <div class="w-[1px] bg-green-500 h-32"></div>
                    <div class="absolute top-0 size-2 rounded-full bg-green-500 -translate-x-1/2"></div>
                    <div class="absolute top-1/2 size-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-green-500"></div>
                    <div class="absolute bottom-0 size-2 rounded-full -translate-x-1/2 bg-green-500"></div>
                </div>
                <div class="flex flex-col ml-4">
                    <div class="flex flex-col">
                        <p class="text-sm">Payment success</p>
                        <p v-if="state.TxData" class="text-green-500 text-xs">
                            {{ `${new Date(state.TxData.timestamp).toLocaleTimeString()}, ${new Date(state.TxData.timestamp).toLocaleDateString()}` }}
                        </p>
                    </div>
                    <div class="flex flex-col mt-5">
                        <p class="text-sm">
                            Processing
                        </p>

                        <p class="text-green-500 text-xs">
                            {{  "Completed"  }}
                        </p>

                    </div>
                    <div class="flex flex-col mt-2">
                        <p class="text-sm">Payment</p>
                        <p class="text-green-500 text-xs">
                            {{ `${new Date(store.widgetObject.invoice.updatedAt * 1000).toLocaleTimeString()}, ${new Date(store.widgetObject.invoice.updatedAt * 1000).toLocaleDateString()}` }}
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
                                    :background="[ (themeMode === 'dark') ? '#000' : '#fff' ]"
                                    :foreground="[ (themeMode === 'dark') ? '#fff' : '#000' ]"
                                    :value="getExplorerLink()"
                                    :size="150"
                                    level="H" />
                    </template>

                </div>
            </div>
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

<script setup>
import QrcodeVue from "qrcode.vue";
import {Separator} from "@/components/ui/separator";
import {SquareArrowOutUpRight} from "lucide-vue-next";
import CopyButton from "@/components/ui/CopyButton.vue";
import {Skeleton} from "@/components/ui/skeleton";
import {onMounted, reactive} from "vue";
import {SimplePayClient} from "simplepay-client-sdk-v2";
import {useWidgetStore} from "../../pinia";

const store = useWidgetStore();
const state = reactive({
    TxData: null,
});

const getExplorerName = () => {

    let result;

    switch(store.widgetObject.invoice.token?.network) {
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

    switch(store.widgetObject.invoice.token?.network) {
        case 'bsc':
            result = `https://bscscan.com/tx/${store.widgetObject.invoice?.transactionId}`;
            break;
        case 'bitcoin':
            result = `https://blockchair.com/bitcoin/transaction/${store.widgetObject.invoice?.transactionId}`;
            break;
        case 'litecoin':
            result = `https://blockchair.com/litecoin/transaction/`;
            break;
        case 'tron':
            result = `https://tronscan.org/#/transaction/${store.widgetObject.invoice?.transactionId}`;
            break;
        default:
            result = `https://etherscan.io/tx/${store.widgetObject.invoice?.transactionId}`;
            break;
    }

    return result;
}

onMounted(async () => {
    //отписатся от InvoiceSuccess
    const sp = new SimplePayClient(store.widgetObject.merchantId, store.widgetObject.projectId);
    const txData = await sp.getTxData(store.widgetObject.invoice.token.id, store.widgetObject.invoice.transactionId);
    const invoiceData = await sp.getInvoice(store.widgetObject.invoice.invoiceId);

    if(txData){
        state.TxData = txData;
    }

    if(invoiceData){
        window.simpleModal.setInvoice(invoiceData);
        store.update(window.simpleModal);
    }
});
</script>