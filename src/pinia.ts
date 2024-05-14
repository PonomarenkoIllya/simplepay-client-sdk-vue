import { defineStore } from 'pinia'

export const useWidgetStore = defineStore('widget', {
    state: () => ({
        widgetObject: {} as any,
        loaderComponentNumber: 0
        // nextButtonDisabled: true
    }),
    actions: {
        update(newObject:any) {
            this.widgetObject = {...newObject};
        },
        remove(){
            this.widgetObject = {};
        },
        setLoaderComponentNumber(newValue:any){
            this.loaderComponentNumber = newValue;
        }
    },
})