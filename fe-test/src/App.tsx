import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { ProductPage } from './components/ProductPage';
import { CartSidebar } from './components/CartSidebar';
import { ConfirmDialog } from './components/ConfirmDialog';
import { Notification } from './components/Notification';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <ProductPage />
        <CartSidebar />
        <ConfirmDialog />
        <Notification />
      </div>
    </CartProvider>
  );
}

export default App;
