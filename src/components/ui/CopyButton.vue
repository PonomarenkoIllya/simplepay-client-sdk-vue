<template>
    <Button @click="() => CopyToClipboard()"
            class="text-xs font-bold max-w-20 w-full h-8 cursor-pointer gap-x-2"
            :class="[ (state.isCopy) && 'text-green-500 bg-green-500_10 hover:bg-green-500/10' ]"
            variant="secondary"
    >
        <template v-if="!state.isCopy">
            <Copy class="size-3 mr-2" />
            Copy
        </template>
        <template v-else>
            Copied
        </template>

    </Button>
</template>

<script setup>
import {Copy, Check} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {reactive, ref} from "vue";

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