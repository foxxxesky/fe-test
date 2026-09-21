import type { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span>📷</span>
      </div>
      <div className="product-title">{product.name}</div>
      <div className="product-price">NT$ {product.price.toLocaleString()}</div>
      <button className="add-to-cart-btn" onClick={() => onAdd(product)}>
        加入購物車
      </button>
    </div>
  );
}
