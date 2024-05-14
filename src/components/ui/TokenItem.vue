<template>
    <div @click="SelectToken" 
        class="cursor-pointer flex w-full justify-between items-center border rounded-lg p-2 hover:bg-secondary"
        :class="[ (store.widgetObject.tokenId === props.token.id) && 'ring-2 ring-green-400' ]"
    >
        <div class="flex gap-x-4 items-center">
            <img :src="props.token.img" class="border bg-background size-8 rounded-full object-cover" />
            <div class="flex flex-col">
                <div class="flex gap-x-4 items-center">
                    <p class="font-bold">
                        {{ props.token.symbol }}
                    </p>

                    <div v-if="props.token.type !== 'native'" class="text-muted-foreground font-bold py-[2px] bg-secondary px-1 border rounded text-xs">
                        {{ token.type }}
                    </div>
                    
                </div>
                <p class="text-muted-foreground capitalize font-bold text-xs">
                    {{ token.network }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {useWidgetStore} from '../../pinia'

    const store = useWidgetStore();
    const props = defineProps(['token'])

    function SelectToken(){
        window.simpleModal.setToken(props.token);
        window.simpleModal.setTokenId(props.token.id);

        store.update(window.simpleModal);
    }
</script>