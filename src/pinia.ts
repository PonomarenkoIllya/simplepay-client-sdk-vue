import { defineStore } from 'pinia'

export const useWidgetStore = defineStore('widget', {
    state: () => ({
        widgetObject: {} as any,
        loaderComponentNumber: 0,
        isDrawerOpen: false,
        isDialogOpen: false,
        connectWalletLoader: false
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
        },
        setIsDrawerOpen(newValue:any){
            this.isDrawerOpen = newValue;
        },
        setIsDialogOpen(newValue:any){
            this.isDialogOpen = newValue;
        },
        setConnectWalletLoader(newValue:any){
            this.connectWalletLoader = newValue;
        }
    },
})