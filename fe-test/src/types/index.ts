export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DialogConfig {
  title: string;
  message: string;
  onConfirm: () => void;
}
