<template>
    <div class="sp-flex sp-flex-col sp-pt-4 md:sp-pt-0">

        <Label class="sp-pb-4">
            <p>Enter your wallet address:</p>
            <Input :placeholder="state.inputPlaceholder"
                   class="sp-mt-2"
                   type="number"
                   v-model="inputValue"
                   @blur="inputBlur"
            />

            <p v-if="state.isError" class="sp-mt-2 sp-text-muted-foreground sp-text-xs sp-text-red-600">
                The price should be in the range from {{store.widgetObject.minPrice}} to {{store.widgetObject.maxPrice}}
            </p>
        </Label>

    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import {useWidgetStore} from '../../pinia'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const store = useWidgetStore();

const state = reactive({
    inputPlaceholder: `Enter the amount from ${store.widgetObject.minPrice} to ${store.widgetObject.maxPrice}`,
    isError: false
})

let inputValue = ref( store.widgetObject.product?.price || '' );

watch(inputValue, async (newValue) => {

    window.simpleModal.setProductPrice(newValue);
    store.update(window.simpleModal);

    state.isError = store.widgetObject.product?.price > store.widgetObject.maxPrice || store.widgetObject.product?.price < store.widgetObject.minPrice;

})
</script>