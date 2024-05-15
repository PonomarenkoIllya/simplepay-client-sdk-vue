<template>
    <Button @click="() => CopyToClipboard()"
            class="sp-text-xs sp-font-bold sp-max-w-20 sp-w-full sp-h-8 sp-cursor-pointer sp-gap-x-2"
            :class="[ (state.isCopy) && 'sp-text-green-500 sp-bg-green-500_10 hover:sp-bg-green-500/10' ]"
            variant="secondary"
    >
        <template v-if="!state.isCopy">
            <Copy class="sp-size-3 sp-mr-2" />
            Copy
        </template>
        <template v-else>
            Copied
        </template>

    </Button>
</template>

<script setup>
import {Copy} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {reactive} from "vue";

const props = defineProps(['copyText'])
const state = reactive({
    isCopy: false
})

function CopyToClipboard(){

    try {

        navigator.clipboard.writeText(props.copyText);

        state.isCopy = true;

        setTimeout(function (){
            state.isCopy = false;
        }, 500)

    }catch (e) {
        console.log('CopyToClipboard error', e)
    }
}
</script>