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

        <template v-if="store.widgetObject?.step === 'chooseToken' || store.widgetObject?.step === 'connectWallet' && !store.connectWalletLoader || store.widgetObject?.step === 'setPrice' || store.widgetObject?.step === 'setEmail'">

            <Button class="sp-w-full sp-cursor-pointer"
                    :disabled="nextButtonDisabled"
                    @click="ButtonClick"
            >
                <template v-if="store.widgetObject?.step === 'setEmail'">
                    Next
                </template>

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

            <Button class="sp-w-full sp-cursor-pointer" @click="CloseWidget">
                Return to store
            </Button>

        </template>
        <template v-else-if="store.widgetObject?.step === 'connectWallet' && store.connectWalletLoader">
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
    import {onMounted, reactive, ref, watch} from 'vue'
    import AwaitingTransactionIndicator from './ui/AwaitingTransactionIndicator.vue'
    // import {SimplePayClient} from 'simplepay-client-sdk-v2';

    const state = reactive({
        windowWidth: window.innerWidth,
        imagePlaceholder: 'https://cdn4.iconfinder.com/data/icons/e-commerce-289/64/ecomerce_shopping_shippement_box_product-512.png'
    })

    // const isDesktop = computed(() => {
    //     return state.windowWidth > 768;
    // })

    const store = useWidgetStore();
    const { widgetObject } = storeToRefs(store)

    let nextButtonDisabled:any = ref( true );

    const getProductImage = () => {

        return (store.widgetObject?.product?.img!)
            ? store.widgetObject?.product?.img!
            : state.imagePlaceholder!;

    }
    // function InvoiceIssuedCallback(invoice:any){
    //
    //     console.log('InvoiceIssuedCallback', invoice)
    //
    //     window.simpleModal.setInvoiceId(invoice.invoiceId);
    //     window.simpleModal.setInvoice(invoice);
    //
    //     store.update(window.simpleModal);
    //
    //     window.simpleModal.setStep('payment');
    //     store.update(window.simpleModal);
    //
    //     connectWalletLoader = false;
    // }
    async function ButtonClick() {

        const chooseStep = (step: Steps) => {

            if (step === 'chooseToken' && !store.widgetObject.isPriceEmpty) return 'connectWallet'
            if (step === 'chooseToken' && store.widgetObject.isPriceEmpty) return 'setPrice'
            if (step === 'setEmail') return 'chooseToken'
            if (step === 'setPrice') return 'connectWallet'

            return 'payment'

        }

        if(store.widgetObject?.step === 'connectWallet'){

            store.setConnectWalletLoader(true);

            await GetInvoice();

            // if(result){
            //
            //     window.simpleModal.setInvoiceId(result.invoiceId);
            //     store.update(window.simpleModal);
            //
            //     const sp = new SimplePayClient(store.widgetObject.merchantId, store.widgetObject.projectId);
            //     sp.subscribe('InvoiceIssued', (invoice:any) => { InvoiceIssuedCallback(invoice) });
            //
            // }

        }else if(store.widgetObject?.step === 'success'){

            store.setIsDrawerOpen(false);
            store.setIsDialogOpen(false);
            // window.simpleModal.closeModal();

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
            "productType": store.widgetObject?.product?.productType || '',
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

        const response = await fetch(store.widgetObject?.url, requestOptions);

        if (response) {
            if (response.redirected) {
                setTimeout(() => {
                    window.location.href = response.url;
                }, 5000);
            }
        }
    }

    const CloseWidget = () => {
        store.setIsDrawerOpen(false);
        store.setIsDialogOpen(false);
        // window.simpleModal.closeModal();
    }

    const validateEmail = (email:string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

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

        if(store.widgetObject?.step === 'setEmail'){

            nextButtonDisabled = !validateEmail(store.widgetObject?.clientEmail);
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