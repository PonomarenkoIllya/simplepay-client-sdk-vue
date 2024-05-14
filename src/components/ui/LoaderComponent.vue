<template>
    <div class="flex flex-col items-center justify-center">
      <div class="relative w-full h-3 bg-secondary/50 rounded border">
        <div
        class="absolute top-0 left-0 bg-green-400 h-full rounded transition-all duration-500"
          :style="{width: state.completionPercentage + '%'}"
        ></div>
      </div>
      <div class="text-xs mt-2 text-muted-foreground">
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