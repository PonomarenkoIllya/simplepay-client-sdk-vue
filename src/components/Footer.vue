<template>
    <footer class="sp-flex sp-border-t"
            :class="[ (store.widgetObject?.step !== 'payment' && store.widgetObject?.step !== 'processing') ? 'sp-gap-x-4 sp-p-4' : 'sp-justify-between sp-items-center sp-w-full sp-p-4' ]"
            >
            
        <div class="sp-flex sp-gap-x-3 sp-w-full">

            <img :src="getProductImage()" class="sp-border sp-bg-secondary sp-size-10 sp-rounded sp-object-cover" />

            <div class="sp-flex sp-flex-col sp-justify-center">
                <p class="sp-text-xs sp-font-bold">Total price:</p>
                <p class="sp-text-xs sp-font-bold">

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

            <Button class="sp-w-full sp-cursor-pointer"
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
                    <Button class="sp-w-full sp-cursor-pointer"
                    >
                        Return to store
                    </Button>
                </DialogClose>
            </template>
            <template v-else>
                <DrawerClose>
                    <Button class="sp-w-full"
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
            "projectId": store.widgetObject.projectId,
            "productId": store.widgetObject?.product.id,
            "tokenId": store.widgetObject.token.id,
            "price": store.widgetObject?.product.price,
            "from": store.widgetObject.address,
            "clientEmail": store.widgetObject.clientEmail
        });

        const requestOptions:any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return (await fetch(store.widgetObject?.url, requestOptions)).json();

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