<template>
    <div id="spContainer" class="spContainer sp-w-full sp-h-svh sp-mt-2 lg:sp-mt-5">
        <template v-if="isDesktop">

            <Dialog v-model:open="store.isDialogOpen">
                <DialogContent class="sm:sp-max-w-sm">
                    <Header />
                    <Modal/>
                    <Footer />
                </DialogContent>
            </Dialog>

        </template>
        <template v-else>

            <Drawer v-model:open="store.isDialogOpen" :dismissible="state.isDrawerDragDisable">
                <DrawerContent>
                    <Header />
                    <Modal/>
                    <Footer />
                </DrawerContent>
            </Drawer>

        </template>

    </div>
</template>

<script setup>
import {reactive, computed, onMounted, watch} from 'vue'
import {useWidgetStore} from './pinia'
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent
} from '@/components/ui/drawer'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Modal from './components/Modal.vue'
import {SimplePayClient} from "simplepay-client-sdk-v2";
import { useColorMode } from '@vueuse/core'
import {storeToRefs} from "pinia";

const store = useWidgetStore();
const { isDialogOpen, isDrawerOpen } = storeToRefs(store)

let mode = useColorMode({
    modes: {
        light: 'sp-light',
        dark: 'sp-dark',
    },
})

const state = reactive({
    windowWidth: window.innerWidth,
    isDrawerDragDisable: !window.simpleModal.isOpenImmediately
})

const isDesktop = computed(() => {
    return state.windowWidth > 768;
})

function CloseWidget(){
    window.simpleModal.closeModal();
}
function CheckWidgetContainers(){

    let container = document.querySelector('#simplePayModalContainer:not(:has(#spContainer))');

    if(container)
        PasteCustomStyles();

}
function PasteCustomStyles(){

    if(window.simpleModal.customColors && (store.isDrawerOpen || store.isDialogOpen)){

        let widgetContainer = document.querySelector('#simplePayModalContainer:not(:has(#spContainer))');

        Object.keys(window.simpleModal.customColors).map((key) => {

            let propertyKey = `--sp-${key}`;
            let propertyValue = `${window.simpleModal.customColors[key]}`;

            widgetContainer.style.setProperty( propertyKey, propertyValue );

        })

    }
}

onMounted(async () => {

    store.setIsDialogOpen(true);
    store.setIsDrawerOpen(true);

    setTimeout(function(){
        PasteCustomStyles();
    }, 0)

    mode.value = (window.simpleModal.darkMode) ? 'sp-dark' : 'sp-light';

    if(window.simpleModal.invoiceId){

        const sp = new SimplePayClient(window.simpleModal.merchantId, window.simpleModal.projectId);
        const invoiceData = await sp.getInvoice(window.simpleModal.invoiceId);

        if(invoiceData){
            if(invoiceData.status === 'issued'){
                window.simpleModal.setInvoice(invoiceData);
                window.simpleModal.setStep('payment');
                store.update(window.simpleModal);
            }else if(invoiceData.status === 'success'){
                window.simpleModal.setInvoice(invoiceData);
                window.simpleModal.setStep('success');
                store.update(window.simpleModal);
            }else if(invoiceData.status === 'processing'){
                window.simpleModal.setInvoice(invoiceData);
                window.simpleModal.setStep('processing');
                store.update(window.simpleModal);
            }

        }

    }

    if(!store.widgetObject.invoice){
        const simpleModalObject = window.simpleModal;
        store.update(simpleModalObject);
    }

    window.addEventListener('resize', () => {
        state.windowWidth = window.innerWidth
    })
})

watch(isDialogOpen, (newValue) => {

    if(!newValue && window.simpleModal.isOpenImmediately){
        store.setIsDialogOpen(true);
        store.setIsDrawerOpen(true);
    }else if(!newValue && !window.simpleModal.isOpenImmediately){
        store.setIsDrawerOpen(false);
        CloseWidget();
    }

});
watch(isDrawerOpen, (newValue) => {
    console.log('watch', newValue)
    if(!newValue && window.simpleModal.isOpenImmediately){
        store.setIsDialogOpen(true);
        store.setIsDrawerOpen(true);
    }else if(!newValue && !window.simpleModal.isOpenImmediately){
        store.setIsDialogOpen(false);
        CloseWidget();
    }

});
watch(isDesktop, (newValue) => {

    setTimeout(function(){
        CheckWidgetContainers();
    }, 0)

});

</script>