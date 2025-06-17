import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { calculateTotal } from '../utils/calculations';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveFromCart }) => {
  const navigate = useNavigate();
  const { subtotal, shipping, vat, total } = calculateTotal(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2>Your cart is empty</h2>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Shopping Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveFromCart}
            />
          ))}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>VAT:</span>
                <span>${vat.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              <button
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;