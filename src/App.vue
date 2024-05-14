<template>
    <div id="spContainer" class="spContainer w-full h-svh mt-2 lg:mt-5">
        <template v-if="isDesktop">

            <Dialog :open="state.isDialogOpen" @update:open="CloseWidget">
                <DialogContent class="sm:max-w-sm">
                    <Header />
                    <Modal/>
                    <Footer />
                </DialogContent>
            </Dialog>

        </template>
        <template v-else>

            <Drawer :open="state.isDrawerOpen" @update:open="CloseWidget">
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
import { reactive, computed, onMounted } from 'vue'
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

const store = useWidgetStore();
let mode = useColorMode({
    modes: {
        light: 'sp-light',
        dark: 'sp-dark',
    },
})

const state = reactive({
    windowWidth: window.innerWidth,
    isDialogOpen: false,
    isDrawerOpen: false
})

const isDesktop = computed(() => {
    return state.windowWidth > 768;
})

onMounted(async () => {

    state.isDialogOpen = true;
    state.isDrawerOpen = true;

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

function CloseWidget(){

    state.isDialogOpen = false;
    state.isDrawerOpen = false;

    window.simpleModal.closeModal();
}

</script>