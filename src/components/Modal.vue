<template>
    <div class="sp-flex sp-flex-col sp-bg-background sp-px-4">

        <Loader v-if="store.widgetObject.step === 'loading'"/>

        <ChooseToken v-if="store.widgetObject.step === 'chooseToken'"/>

        <SetPrice v-if="store.widgetObject.step === 'setPrice'"/>

        <ConnectWallet v-if="store.widgetObject.step === 'connectWallet'"/>

        <Payment v-if="store.widgetObject.step === 'payment'"/>

        <Processing v-if="store.widgetObject.step === 'processing'"/>

        <Success v-if="store.widgetObject.step === 'success'"/>
        
    </div>
</template>

<script setup>
    import Loader from './pages/Loader.vue';
    import ChooseToken from './pages/ChooseToken.vue';
    import ConnectWallet from './pages/ConnectWallet.vue';
    import Payment from './pages/Payment.vue';
    import Processing from './pages/Processing.vue';
    import {useWidgetStore} from '../pinia'
    import SetPrice from "@/components/pages/SetPrice.vue";
    import Success from "@/components/pages/Success.vue";

    const store = useWidgetStore();
</script>