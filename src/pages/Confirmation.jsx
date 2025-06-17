import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = ({ orderDetails, onClearCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
      return;
    }
    // Clear the cart after successful order
    onClearCart();
  }, [orderDetails, navigate, onClearCart]);

  if (!orderDetails) return null;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body text-center">
          <div className="mb-4">
            <i className="bi bi-check-circle text-success" style={{ fontSize: '4rem' }}></i>
          </div>
          <h1 className="card-title mb-4">Order Confirmed!</h1>
          <p className="card-text">Thank you for your purchase, {orderDetails.customerInfo.firstName}!</p>
          <p className="card-text">Your order has been confirmed and will be shipped soon.</p>
          
          <div className="mt-4">
            <h5>Order Summary</h5>
            <p>Total Amount: ${orderDetails.total.toFixed(2)}</p>
            <p>Shipping Address:</p>
            <address>
              {orderDetails.customerInfo.address}<br />
              {orderDetails.customerInfo.city}, {orderDetails.customerInfo.postalCode}<br />
              {orderDetails.customerInfo.country}
            </address>
          </div>

          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;