import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { createPinia } from 'pinia'

declare global {
    interface Window {
        simpleModal: SimpleModal;
    }
}

export class SimpleModal {

    public merchantId: string
    public projectId: string
    public product: Product | null = null
    public url: string;
    public tokenId: number | null = null;
    public token: Token | null = null;
    public step: Steps;
    public address: string | null = null;
    public createdAt: Date | null = null;
    public callerId: string;
    public invoiceId: string | null = null;
    public invoice: ParsedContractInvoice | null = null;
    public transaction: any | null = null;
    public darkMode: boolean;
    public clientEmail: string;
    public customColors: object | null;
    public isOpenImmediately: boolean;
    public isEmailEmpty: boolean;
    public isPriceEmpty: boolean;
    private maxPrice: number;
    private minPrice: number;
    private root: HTMLElement | null = null;
    private new: boolean

    constructor({ merchantId, projectId, callerId, url, tokenId, product, invoiceId, minPrice, maxPrice, darkMode, clientEmail, customColors, isOpenImmediately, isEmailEmpty, isPriceEmpty }: ConstructorProps) {
        console.log('\n \n 🤘🏻 Open-Source Crypto Payments \n \n 📜 Docs: https://simplepay.ai \n');
        this.merchantId = merchantId
        this.projectId = projectId
        this.new = true;
        this.invoiceId = invoiceId ?? null
        this.product = product ?? null
        this.url = url;
        this.tokenId = tokenId ?? null;
        this.callerId = callerId ?? 'openSimpleModal';
        this.step = 'loading'
        this.createdAt = null
        this.minPrice = minPrice ?? 1
        this.maxPrice = maxPrice ?? 10000
        this.darkMode = darkMode ?? false
        this.clientEmail = clientEmail ?? ''
        this.customColors = customColors ?? null
        this.isOpenImmediately = isOpenImmediately ?? false
        this.isEmailEmpty = isEmailEmpty ?? false
        this.isPriceEmpty = isPriceEmpty ?? false
        this.initialize({ callerId, url, tokenId, clientEmail })
        const openBtn = document.getElementById(this.callerId);
        console.log(this.callerId)
        if (!url) {
            console.error('[SimplePay]: 🥶 Invalid URL!');
            return;
        }
        if (!openBtn) {
            console.error('[SimplePay]: 🥶 Element to trigger modal was not found!');
            return;
        }

        openBtn.addEventListener('click', () => {
            this.openModal();
        });

        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                this.closeModal();
            }
        });

        this.root = document.createElement('div');
        this.root.id = 'simplePayModal';

        if (!tokenId) {
            this.step = 'chooseToken';
        } else {
            this.step = 'payment'
        }

        window.simpleModal = this

        if(this.isOpenImmediately){
            this.openModal();
        }
    }

    private initialize({ callerId, url, tokenId, clientEmail }: InitProps) {
        console.log('🪪 Initializing New Payment widget...', this.invoiceId);

        const createdAt = new Date()
        this.createdAt = createdAt
        this.url = url;
        this.tokenId = tokenId ?? null;
        this.step = (clientEmail && clientEmail !== '' && !this.invoiceId) ? 'chooseToken' : 'setEmail'
        this.isEmailEmpty = !(clientEmail && clientEmail !== '')
        this.isPriceEmpty = (!this.product || !this.product?.price)
        this.callerId = callerId ?? 'openSimpleModal';
        this.clientEmail = clientEmail ?? '';
        console.log(this.minPrice, this.maxPrice)

        console.log('🚀 Widget is ready!', 'success');
    }

    public openModal() {
        if (!document.body.contains(this.root)) {
            let modalContainerElement = document.createElement('div');
            modalContainerElement.id = 'simplePayModalContainer';

            document.body.appendChild(modalContainerElement);
            document.querySelector('#simplePayModalContainer')?.appendChild(this.root!);

            console.log('👻 Rendering Payment Window...');
            if (this.new) {
                this.initialize({ callerId: this.callerId, url: this.url, clientEmail: this.clientEmail })
                this.new = false
            }

            const pinia = createPinia();
            createApp(App).use(pinia).mount(this.root!)

        }
    }
    public closeModal() {
        if(document.body.contains(this.root)) {
            this.root?.remove();
            document.querySelector('#simplePayModalContainer')?.remove();
            console.log('🖐🏻 Payment Window closed.');
        }
    }
    public setTokenId(tokenId: number) {
        this.tokenId = tokenId
    }
    public setToken(token: Token) {
        this.token = token
    }
    public setStep(step: Steps) {
        this.step = step
    }
    public setAddress(address: string) {
        this.address = address
    }
    public setEmail(email: string) {
        this.clientEmail = email
    }
    public setInvoiceId(invoiceId: string) {
        this.invoiceId = invoiceId
    }
    public setInvoice(invoice: ParsedContractInvoice) {
        this.invoice = invoice
    }
    public setTransaction(transaction: any) {
        this.transaction = transaction
    }
    public setProductPrice(price: any) {

        if(!this.product){
            this.product = null;
        }else{
            this.product.price = price
        }
    }
    public cancel() {
        const sure = confirm('Are you sure want to cancel invoice?')
        if (sure) {
            this.new = true
            this.closeModal()
        }
    }
}

// const darkColor = {
//     'main-color': '#ffffff',
//     'background': '#121212',
//     'foreground': '#050808',
//     'muted': '#f2f2f2',
//     'muted-foreground': '#ffffff',
//     'popover': '#ffffff',
//     'popover-foreground': '#020202',
//     'card': '#ffffff',
//     'card-foreground': '#020202',
//     'border': '#828282',
//     'input': '#e0e0e0',
//     'primary': '#ffffff',
//     'primary-foreground': '#000000',
//     'secondary': '#ffffff',
//     'secondary-foreground': '#191919',
//     'accent': '#f2f2f2',
//     'accent-foreground': '#191919',
//     'destructive': '#cc3333',
//     'destructive-foreground': '#fcfcfc',
//     'ring': '#020202',
//     'selected-ring': '#616161',
//     'error': '#804040',
// }
// const blueColor = {
//     'main-color': '#ffffff',
//     'background': '#6188b1',
//     'foreground': '#040a0e',
//     'muted': '#f2f2f2',
//     'muted-foreground': '#ffffff',
//     'popover': '#ffffff',
//     'popover-foreground': '#020202',
//     'card': '#ffffff',
//     'card-foreground': '#020202',
//     'border': '#ffffff',
//     'input': '#e0e0e0',
//     'primary': '#ffffff',
//     'primary-foreground': '#000000',
//     'secondary': '#525252',
//     'secondary-foreground': '#bfbfbf',
//     'accent': '#f2f2f2',
//     'accent-foreground': '#191919',
//     'destructive': '#cc3333',
//     'destructive-foreground': '#fcfcfc',
//     'ring': '#020202',
//     'selected-ring': '#000000',
//     'error': '#804040',
// }
// const redColor = {
//     'main-color': '#000000',
//     'background': '#804040',
//     'foreground': '#040a0e',
//     'muted': '#f2f2f2',
//     'muted-foreground': '#ffffff',
//     'popover': '#ffffff',
//     'popover-foreground': '#020202',
//     'card': '#ffffff',
//     'card-foreground': '#020202',
//     'border': '#000000',
//     'input': '#e0e0e0',
//     'primary': '#ffffff',
//     'primary-foreground': '#000000',
//     'secondary': '#ffffff',
//     'secondary-foreground': '#000000',
//     'accent': '#f2f2f2',
//     'accent-foreground': '#191919',
//     'destructive': '#cc3333',
//     'destructive-foreground': '#fcfcfc',
//     'ring': '#020202',
//     'selected-ring': '#000000',
//     'error': '#804040',
// }
//
// const product = {
//     id: 'b8d806ea-8d22-48f1-a74b-71266e65affa',
//     title: 'Product title mfekkemgekgfkmefm kfmekmfe m kfme',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     img: '', //'https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=2889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',//
//     price: 0.01
// }
//
// export default new SimpleModal({
//     projectId: 'f0b135de-a9e1-41b1-a6e1-5413e78a3e3b',
//     merchantId: 'c2ee7172-8295-4ce1-8a5c-cbf311c3ad8e',
//     url: 'https://26e9-62-4-45-209.ngrok-free.app/invoice',
//     callerId: 'openSimpleModal',//id элемента который вызывает модалку
//     product: product,
//     maxPrice: 100,
//     minPrice: 25,
//     // invoiceId: "c9e84b6d-39e6-4b0f-b4e3-3121f9a09015",//82a434af-7809-4e67-bf44-6da90f93a1f5
//     // darkMode: true,
//     clientEmail: 'lol',
//     // customColors: darkColor,
//     isOpenImmediately: true
// });