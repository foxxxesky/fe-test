import { useCart } from '../context/CartContext';
import './ConfirmDialog.css';

export function ConfirmDialog() {
  const { dialog, dismissDialog } = useCart();
  if (!dialog) return null;

  return (
    <div className="dialog-backdrop" onClick={dismissDialog}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="dialog-title">{dialog.title}</h3>
        <p className="dialog-message">{dialog.message}</p>
        <div className="dialog-actions">
          <button className="dialog-btn cancel" onClick={dismissDialog}>
            取消
          </button>
          <button className="dialog-btn confirm" onClick={dialog.onConfirm}>
            確認
          </button>
        </div>
      </div>
    </div>
  );
}
