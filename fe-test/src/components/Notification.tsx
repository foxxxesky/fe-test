import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import './Notification.css';

export function Notification() {
  const { notification } = useCart();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (notification) {
      setText(notification);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className={`notification ${visible ? 'show' : ''}`}>
      {text}
    </div>
  );
}
