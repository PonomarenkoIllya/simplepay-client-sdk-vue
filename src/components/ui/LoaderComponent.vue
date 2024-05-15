<template>
    <div class="sp-flex sp-flex-col sp-items-center sp-justify-center">
        <div class="sp-relative sp-w-full sp-h-3 sp-bg-secondary/50 sp-rounded sp-border">
            <div
                class="sp-absolute sp-top-0 sp-left-0 sp-bg-green-400 sp-h-full sp-rounded sp-transition-all sp-duration-500"
                :style="{width: state.completionPercentage + '%'}"
            ></div>
        </div>
        <div class="sp-text-xs sp-mt-2 sp-text-muted-foreground">
            {{ `~${state.completionPercentage}% Completed` }}
        </div>
    </div>
</template>

<script setup>
import {reactive, ref, watch} from 'vue'
import {useWidgetStore} from "../../pinia";
import {storeToRefs} from 'pinia';

const props = defineProps(['totalBlocks'])
const store = useWidgetStore();
const { loaderComponentNumber } = storeToRefs(store)

const state = reactive({
    completionPercentage: 0
})

watch(loaderComponentNumber, (newValue) => {
    state.completionPercentage = (Math.round((newValue / props.totalBlocks) * 100) >= 98) ? 98 : Math.round((newValue / props.totalBlocks) * 100);
})

</script>