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
    private maxPrice: number;
    private minPrice: number;
    private root: HTMLElement | null = null;
    private new: boolean

    constructor({ merchantId, projectId, callerId, url, tokenId, product, invoiceId, minPrice, maxPrice, darkMode, clientEmail }: ConstructorProps) {
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
        this.clientEmail = clientEmail
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
    }

    private initialize({ callerId, url, tokenId, clientEmail }: InitProps) {
        console.log('🪪 Initializing New Payment widget...');

        const createdAt = new Date()
        this.createdAt = createdAt
        this.url = url;
        this.tokenId = tokenId ?? null;
        this.step = 'chooseToken'
        this.callerId = callerId ?? 'openSimpleModal';
        this.clientEmail = clientEmail;
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