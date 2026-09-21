import { useState, useDeferredValue, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { SearchBox } from './SearchBox';
import { ProductGrid } from './ProductGrid';
import { products } from '../data/products';
import './ProductPage.css';

export function ProductPage() {
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [deferred]);

  return (
    <main className="main-content">
      <div className="search-bar">
        <SearchBox value={query} onChange={setQuery} />
      </div>
      <ProductGrid products={filtered} onAdd={addToCart} />
    </main>
  );
}
