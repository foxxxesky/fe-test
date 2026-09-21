/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem, DialogConfig, NotificationInfo } from '../types';

interface CartContextValue {
  cart: CartItem[];
  isCartOpen: boolean;
  notification: NotificationInfo | null;
  dialog: DialogConfig | null;
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, step?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, change: number) => void;
  setItemQuantity: (productId: number, quantity: number) => void;
  checkout: () => void;
  toggleCart: () => void;
  openCart: () => void;
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
  const [notification, setNotification] = useState<NotificationInfo | null>(null);
  const [dialog, setDialog] = useState<DialogConfig | null>(null);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const showNotification = useCallback((message: string) => {
    setNotification({ id: Date.now(), message });
  }, []);

  const dismissDialog = useCallback(() => {
    setDialog(null);
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

  const removeFromCart = useCallback(
    (productId: number) => {
      const item = cart.find((i) => i.product.id === productId);
      if (!item) return;

      setDialog({
        title: '確認移除商品',
        message: `確定要從購物車中移除「${item.product.name}」嗎？`,
        onConfirm: () => {
          setCart((prev) => prev.filter((i) => i.product.id !== productId));
          dismissDialog();
          showNotification(`已將「${item.product.name}」從購物車中移除`);
        },
      });
    },
    [cart, dismissDialog, showNotification]
  );

  const updateQuantity = useCallback(
    (productId: number, change: number) => {
      const item = cart.find((i) => i.product.id === productId);
      if (!item) return;

      if (item.quantity + change <= 0) {
        setDialog({
          title: '確認移除商品',
          message: `數量減至 0，確定要從購物車中移除「${item.product.name}」嗎？`,
          onConfirm: () => {
            setCart((prev) => prev.filter((i) => i.product.id !== productId));
            dismissDialog();
            showNotification(`已將「${item.product.name}」從購物車中移除`);
          },
        });
        return;
      }

      setCart((prev) =>
        prev.map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity + change }
            : i
        )
      );
    },
    [cart, dismissDialog, showNotification]
  );

  const setItemQuantity = useCallback(
    (productId: number, quantity: number) => {
      const item = cart.find((i) => i.product.id === productId);
      if (!item) return;

      if (quantity <= 0) {
        setDialog({
          title: '確認移除商品',
          message: `數量為 0，確定要從購物車中移除「${item.product.name}」嗎？`,
          onConfirm: () => {
            setCart((prev) => prev.filter((i) => i.product.id !== productId));
            dismissDialog();
            showNotification(`已將「${item.product.name}」從購物車中移除`);
          },
        });
        return;
      }

      setCart((prev) =>
        prev.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        )
      );
    },
    [cart, dismissDialog, showNotification]
  );

  const checkout = useCallback(() => {
    if (cart.length === 0) {
      showNotification('購物車是空的！');
      return;
    }
    setDialog({
      title: '確認結帳',
      message: `確定要結帳嗎？總計 ${totalItems} 件商品，總金額為 NT$ ${totalPrice.toLocaleString()}`,
      onConfirm: () => {
        setCart([]);
        setIsCartOpen(false);
        dismissDialog();
        showNotification('結帳成功！感謝您的購買。');
      },
    });
  }, [cart.length, totalItems, totalPrice, dismissDialog, showNotification]);

  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
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
    setItemQuantity,
    checkout,
    toggleCart,
    openCart,
    closeCart,
    showNotification,
    dismissDialog,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
