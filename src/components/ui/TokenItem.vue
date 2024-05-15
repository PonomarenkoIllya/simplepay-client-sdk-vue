<template>
    <div @click="SelectToken"
         class="sp-cursor-pointer sp-flex sp-w-full sp-justify-between sp-items-center sp-border sp-rounded-lg sp-p-2 hover:sp-bg-secondary"
         :class="[ (store.widgetObject.tokenId === props.token.id) && 'sp-ring-2 sp-ring-green-400' ]"
    >
        <div class="sp-flex sp-gap-x-4 sp-items-center">
            <img :src="props.token.img" class="sp-border sp-bg-background sp-size-8 sp-rounded-full sp-object-cover" />
            <div class="sp-flex sp-flex-col">
                <div class="sp-flex sp-gap-x-4 sp-items-center">
                    <p class="sp-font-bold">
                        {{ props.token.symbol }}
                    </p>

                    <div v-if="props.token.type !== 'native'" class="sp-text-muted-foreground sp-font-bold sp-py-[2px] sp-bg-secondary sp-px-1 sp-border sp-rounded sp-text-xs">
                        {{ token.type }}
                    </div>

                </div>
                <p class="sp-text-muted-foreground sp-capitalize sp-font-bold sp-text-xs">
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