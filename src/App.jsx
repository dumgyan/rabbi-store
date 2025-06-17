import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

// Store
import { useCartStore } from './store/cartStore';

function App() {
  const [orderDetails, setOrderDetails] = useState(null);
  const cartItems = useCartStore(state => state.items);
  const addToCart = useCartStore(state => state.addItem);
  const updateCartItemQuantity = useCartStore(state => state.updateQuantity);
  const removeFromCart = useCartStore(state => state.removeItem);
  const clearCart = useCartStore(state => state.clearCart);

  const handleOrderComplete = (details) => {
    setOrderDetails(details);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} />} />
            <Route path="/cart" element={
              <Cart 
                cartItems={cartItems} 
                onUpdateQuantity={updateCartItemQuantity} 
                onRemoveFromCart={removeFromCart} 
              />
            } />
            <Route path="/checkout" element={
              <Checkout 
                cartItems={cartItems} 
                onOrderComplete={handleOrderComplete} 
              />
            } />
            <Route path="/confirmation" element={
              <Confirmation 
                orderDetails={orderDetails}
                onClearCart={clearCart}
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
