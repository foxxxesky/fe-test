import { useState } from 'react';
import './QuantityControls.css';

interface QuantityControlsProps {
  quantity: number;
  onIncrease: (step: number) => void;
  onDecrease: (step: number) => void;
  onSetQuantity?: (val: number) => void;
  step?: number;
}

export function QuantityControls({
  quantity,
  onIncrease,
  onDecrease,
  onSetQuantity,
  step: initialStep = 1,
}: QuantityControlsProps) {
  const [step, setStep] = useState(initialStep);

  return (
    <div className="quantity-controls">
      <div className="step-picker">
        <label className="step-label" htmlFor={`step-select-${quantity}`}>
          倍數:
        </label>
        <select
          id={`step-select-${quantity}`}
          className="step-select"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          aria-label="選擇數量倍數"
        >
          <option value={1}>±1</option>
          <option value={2}>±2</option>
          <option value={5}>±5</option>
          <option value={10}>±10</option>
        </select>
      </div>

      <div className="quantity-button-group">
        <button
          type="button"
          className="quantity-btn decrease-btn"
          onClick={() => onDecrease(step)}
          aria-label={`減少 ${step}`}
        >
          −{step > 1 ? step : ''}
        </button>

        {onSetQuantity ? (
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            min={1}
            aria-label="商品數量"
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) {
                onSetQuantity(val);
              }
            }}
          />
        ) : (
          <span className="quantity-display">{quantity}</span>
        )}

        <button
          type="button"
          className="quantity-btn increase-btn"
          onClick={() => onIncrease(step)}
          aria-label={`增加 ${step}`}
        >
          +{step > 1 ? step : ''}
        </button>
      </div>
    </div>
  );
}
