import { useCart } from '../context/CartContext';
import { CartItem } from './CartItem';
import './CartSidebar.css';

export function CartSidebar() {
  const {
    cart,
    isCartOpen,
    totalPrice,
    updateQuantity,
    setItemQuantity,
    removeFromCart,
    checkout,
    closeCart,
    dialog,
  } = useCart();

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <>
      {isCartOpen && !dialog && (
        <div className="cart-overlay" onClick={closeCart} />
      )}
      <aside
        className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}
        aria-label="購物車側邊欄"
        aria-hidden={!isCartOpen}
      >
        <div className="cart-header">
          <h2>購物車</h2>
          <button className="close-cart" onClick={closeCart} aria-label="關閉購物車">
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">購物車是空的</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onSetQuantity={setItemQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

        <div className="cart-total">
          <div className="total-price">
            總計: NT$ {totalPrice.toLocaleString()}
          </div>
          <button
            className="checkout-btn"
            onClick={checkout}
            disabled={cart.length === 0}
          >
            結帳
          </button>
        </div>
      </aside>
    </>
  );
}
