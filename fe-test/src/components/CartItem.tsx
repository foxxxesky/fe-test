import type { CartItem as CartItemType } from '../types';
import { QuantityControls } from './QuantityControls';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, change: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="cart-item">
      <div className="cart-item-image">📷</div>
      <div className="cart-item-details">
        <div className="cart-item-title">{item.product.name}</div>
        <div className="cart-item-price">
          NT$ {item.product.price.toLocaleString()}
        </div>
        <QuantityControls
          quantity={item.quantity}
          onIncrease={() => onUpdateQuantity(item.product.id, 1)}
          onDecrease={() => onUpdateQuantity(item.product.id, -1)}
        />
      </div>
      <button
        className="cart-item-remove"
        onClick={() => onRemove(item.product.id)}
        aria-label="移除商品"
      >
        ✕
      </button>
    </div>
  );
}
