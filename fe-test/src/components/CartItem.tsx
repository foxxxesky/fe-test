import type { CartItem as CartItemType } from '../types';
import { QuantityControls } from './QuantityControls';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, change: number) => void;
  onSetQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onSetQuantity,
  onRemove,
}: CartItemProps) {
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
          onIncrease={(step) => onUpdateQuantity(item.product.id, step)}
          onDecrease={(step) => onUpdateQuantity(item.product.id, -step)}
          onSetQuantity={(val) => onSetQuantity(item.product.id, val)}
        />
      </div>
      <button
        className="cart-item-remove"
        onClick={() => onRemove(item.product.id)}
        aria-label="移除商品"
        title="移除商品"
      >
        ✕
      </button>
    </div>
  );
}
