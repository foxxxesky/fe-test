import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem, DialogConfig } from '../types';

interface CartContextValue {
  cart: CartItem[];
  isCartOpen: boolean;
  notification: string | null;
  dialog: DialogConfig | null;
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, step?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, change: number) => void;
  checkout: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  showNotification: (msg: string) => void;
  dismissDialog: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogConfig | null>(null);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const addToCart = useCallback(
    (product: Product, step = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + step }
              : item
          );
        }
        return [...prev, { product, quantity: step }];
      });
      showNotification(`已將「${product.name}」加入購物車`);
    },
    [showNotification]
  );

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const dismissDialog = useCallback(() => setDialog(null), []);

  const checkout = useCallback(() => {
    if (cart.length === 0) {
      showNotification('購物車是空的！');
      return;
    }
    setDialog({
      title: '確認結帳',
      message: `確定要結帳嗎？總金額為 NT$ ${totalPrice.toLocaleString()}`,
      onConfirm: () => {
        setCart([]);
        setIsCartOpen(false);
        dismissDialog();
        showNotification('結帳成功！感謝您的購買。');
      },
    });
  }, [cart.length, totalPrice, dismissDialog, showNotification]);

  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value: CartContextValue = {
    cart,
    isCartOpen,
    notification,
    dialog,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    checkout,
    toggleCart,
    closeCart,
    showNotification,
    dismissDialog,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
