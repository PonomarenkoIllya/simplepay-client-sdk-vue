interface ModalProviderState extends Settings {
  setSettings: (settings: any) => any,
}

type TokenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TokenType = 'native' | 'ERC20' | 'BEP20' | 'TRC20';
type TokenNetwork = 'bitcoin' | 'litecoin' | 'ethereum' | 'tron' | 'bsc';
type Token = {
    id: TokenId;
    contractAddress: 'native' | string;
    img: string;
    title: string;
    stable: boolean;
    price: number;
    decimals: number;
    type: TokenType;
    symbol: string;
    network: TokenNetwork;
};

type InvoiceStatus = "created" | "processing" | "success" | "rejected";

interface ParsedContractInvoice {
  invoiceId?: string;
  createdAt?: number;
  updatedAt?: number | null;
  merchantId: string;
  projectId: string;
  productId: string | null;
  tokenId: TokenId;
  tokenAmount: string;
  tokenPrice: string;
  from: string;
  to: string;
  clientEmail: string;
  transactionId?: string | null;
  status?: InvoiceStatus;
}

interface Settings {
  invoice: ParsedContractInvoice | null,
  transaction: any,
  merchantId: string | null,
  projectId: string | null,
  step: Steps,
  invoiceId: string | null,
  product: Product | null,
  price: number | null,
  token: Token | null,
  tokenId: number | null,
  clientId: string | null,
  address: string | null
}

type Product = {
  id: string,
  title: string,
  description?: string,
  img?: string,
  price?: number
}

type InitProps = {
  url: string,
  callerId?: string,
  tokenId?: number
}

type ConstructorProps = {
  merchantId: string,
  projectId: string,
  callerId: string , 
  url: string , 
  tokenId?: number , 
  product?: Product , 
  invoiceId?: string,
  minPrice?: number,
  maxPrice?: number,
  darkMode?: boolean,
}

type Steps = "loading" | "chooseToken" | "setPrice" | "connectWallet" | "payment" | "processing" | "success"