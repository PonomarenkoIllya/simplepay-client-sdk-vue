<template>
    <footer class="flex border-t"
            :class="[ (store.widgetObject?.step !== 'payment' && store.widgetObject?.step !== 'processing') ? 'gap-x-4 p-4' : 'justify-between items-center w-full p-4' ]"
            >
            
        <div class="flex gap-x-3 w-full">

            <img :src="getProductImage()" class="border bg-secondary size-10 rounded object-cover" />

            <div class="flex flex-col justify-center">
                <p class="text-xs font-bold">Total price:</p>
                <p class="text-xs font-bold">

                    <template v-if="store.widgetObject?.product?.price">
                        {{ store.widgetObject?.product?.price?.toFixed(2) }}
                    </template>
                    <template v-else>
                        Custom
                    </template>

                </p>
            </div>
        </div>

        <template v-if="store.widgetObject?.step === 'chooseToken' || store.widgetObject?.step === 'connectWallet' && !connectWalletLoader || store.widgetObject?.step === 'setPrice'">

            <Button class="w-full cursor-pointer"
                    :disabled="nextButtonDisabled"
                    @click="ButtonClick"
            >

                <template v-if="store.widgetObject?.step === 'chooseToken'">
                    Next
                </template>

                <template v-if="store.widgetObject?.step === 'setPrice'">
                    Next
                </template>

                <template v-if="store.widgetObject?.step === 'connectWallet'">
                    Confirm
                </template>

            </Button>
        </template>
        <template v-else-if="store.widgetObject?.step === 'success'">

            <template v-if="isDesktop">
                <DialogClose>
                    <Button class="w-full cursor-pointer"
                    >
                        Return to store
                    </Button>
                </DialogClose>
            </template>
            <template v-else>
                <DrawerClose>
                    <Button class="w-full"
                    >
                        Return to store
                    </Button>
                </DrawerClose>
            </template>

        </template>
        <template v-else-if="store.widgetObject?.step === 'connectWallet' && connectWalletLoader">
            <AwaitingTransactionIndicator />
        </template>
        <template v-else>
            <AwaitingTransactionIndicator />
        </template>

    </footer>
</template>

<script setup lang="ts">
    import Button from './ui/button/Button.vue';
    import {useWidgetStore} from '../pinia'
    import { storeToRefs } from 'pinia'
    import {computed, onMounted, reactive, ref, watch} from 'vue'
    import AwaitingTransactionIndicator from './ui/AwaitingTransactionIndicator.vue'
    import {SimplePayClient} from 'simplepay-client-sdk-v2';
    import {DialogClose} from "@/components/ui/dialog";
    import {DrawerClose} from "@/components/ui/drawer";

    const state = reactive({
        windowWidth: window.innerWidth,
        imagePlaceholder: 'https://cdn4.iconfinder.com/data/icons/e-commerce-289/64/ecomerce_shopping_shippement_box_product-512.png'
    })

    const isDesktop = computed(() => {
        return state.windowWidth > 768;
    })

    const store = useWidgetStore();
    const { widgetObject } = storeToRefs(store)

    let nextButtonDisabled:any = ref( true );
    let connectWalletLoader:any = ref( false );

    const getProductImage = () => {

        return (store.widgetObject?.product?.img!)
            ? store.widgetObject?.product?.img!
            : state.imagePlaceholder!;

    }
    function InvoiceIssuedCallback(invoice:any){
        window.simpleModal.setInvoiceId(invoice.invoiceId);
        window.simpleModal.setInvoice(invoice);

        store.update(window.simpleModal);

        window.simpleModal.setStep('payment');
        store.update(window.simpleModal);

        connectWalletLoader = false;
    }
    async function ButtonClick() {

        const chooseStep = (step: Steps) => {

            if (step === 'chooseToken' && store.widgetObject?.product?.price) return 'connectWallet'
            if (step === 'chooseToken' && !store.widgetObject?.product?.price) return 'setPrice'
            if (step === 'setPrice') return 'connectWallet'

            return 'payment'

        }

        if(store.widgetObject?.step === 'connectWallet'){

            connectWalletLoader = true;

            let result = await GetInvoice();

            if(result){

                window.simpleModal.setInvoiceId(result.invoiceId);
                store.update(window.simpleModal);

                const sp = new SimplePayClient(store.widgetObject.merchantId, store.widgetObject.projectId);
                sp.subscribe('InvoiceIssued', (invoice:any) => { InvoiceIssuedCallback(invoice) });

            }

        }else if(store.widgetObject?.step === 'success'){

            window.simpleModal.closeModal();

        }else{

            window.simpleModal.setStep(chooseStep(store.widgetObject?.step));
            store.update(window.simpleModal);

        }

    }
    async function GetInvoice(){

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "merchantId": store.widgetObject.merchantId,
            "secret_key": "0040e33fc90480b9eb7a56684f75719794b034b7570ea379896b46c5ffce5a81",
            "projectId": store.widgetObject.projectId,
            "projectSecret": "AOrcTTOFiuCweEK5QkUc4oXbFkrxpCoh1Gzje+rlynI=:XdpcmVII0nvqm1XBEyloWA==",
            "productId": store.widgetObject?.product.id,
            "tokenId": store.widgetObject.token.id,
            "price": store.widgetObject?.product.price,
            "from": store.widgetObject.address,
            "clientEmail": "ilyakoz1996@gmail.com"
        });

        const requestOptions:any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return (await fetch("https://processing.simplepay.ai/raw/invoice", requestOptions)).json();

    }

    onMounted(() => {
        window.addEventListener('resize', () => {
            state.windowWidth = window.innerWidth
        })
    })

    watch(widgetObject, () => {

        if(store.widgetObject?.step === 'chooseToken'){
            nextButtonDisabled = !store.widgetObject?.tokenId;
            return;
        }

        if(store.widgetObject?.step === 'connectWallet'){
            nextButtonDisabled = !store.widgetObject?.address;
            return;
        }

        if(store.widgetObject?.step === 'setPrice'){

            let buttonCheck = !store.widgetObject?.price;
            let rangeCheck = !(store.widgetObject?.product?.price >= store.widgetObject?.minPrice && store.widgetObject?.product?.price <= store.widgetObject?.maxPrice)
            nextButtonDisabled = buttonCheck && rangeCheck;
            return;
        }

        nextButtonDisabled = true;

    })

    watch(widgetObject, () => {

        if(store.widgetObject?.step !== 'connectWallet'){
            //отписываемся от InvoiceIssued
        }
    })
</script>