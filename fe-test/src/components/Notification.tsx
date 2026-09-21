import { useCart } from '../context/CartContext';
import './Notification.css';

export function Notification() {
  const { notification } = useCart();

  return (
    <div
      className={`notification ${notification ? 'show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {notification?.message ?? ''}
    </div>
  );
}
