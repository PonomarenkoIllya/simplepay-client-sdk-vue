<template>
    <div class="sp-flex sp-flex-col sp-pt-4 md:sp-pt-0">

        <Label class="sp-pb-4">
            <p>Enter email address:</p>
            <Input :placeholder="state.inputPlaceholder"
                   class="sp-mt-2"
                   v-model="inputValue"
            />

            <p v-if="state.isError" class="sp-mt-2 sp-text-muted-foreground sp-text-xs sp-text-red-600">
                Incorrect email
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
    inputPlaceholder: `Enter your email`,
    isError: false
})

let inputValue = ref( store.widgetObject?.clientEmail || '' );

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

watch(inputValue, async (newValue) => {

    window.simpleModal.setEmail(newValue);
    store.update(window.simpleModal);

    state.isError = !validateEmail(newValue);

})
</script>