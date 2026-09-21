import { useCart } from '../context/CartContext';
import './Header.css';

export function Header() {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="header-title">精品商店</h1>
        <button className="cart-icon" onClick={toggleCart} aria-label="開啟購物車">
          🛒 購物車
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}
