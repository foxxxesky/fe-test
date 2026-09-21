import './QuantityControls.css';

interface QuantityControlsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  step?: number;
}

export function QuantityControls({
  quantity,
  onIncrease,
  onDecrease,
  step = 1,
}: QuantityControlsProps) {
  return (
    <div className="quantity-controls">
      <button className="quantity-btn" onClick={onDecrease} aria-label="減少數量">
        {step > 1 ? `-${step}` : '−'}
      </button>
      <span className="quantity-display">{quantity}</span>
      <button className="quantity-btn" onClick={onIncrease} aria-label="增加數量">
        {step > 1 ? `+${step}` : '+'}
      </button>
    </div>
  );
}
