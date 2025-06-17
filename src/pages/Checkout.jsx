import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateTotal } from '../utils/calculations';

const Checkout = ({ cartItems, onOrderComplete }) => {
  const navigate = useNavigate();
  const { subtotal, shipping, vat, total } = calculateTotal(cartItems);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (formData.firstName.length < 2) newErrors.firstName = 'First name is too short';
    if (formData.lastName.length < 2) newErrors.lastName = 'Last name is too short';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';

    // Address validation
    if (formData.address.length < 5) newErrors.address = 'Please enter a valid address';
    if (formData.city.length < 2) newErrors.city = 'Please enter a valid city';
    if (formData.postalCode.length < 3) newErrors.postalCode = 'Please enter a valid postal code';
    if (formData.country.length < 2) newErrors.country = 'Please enter a valid country';

    // Payment validation
    const cardNumberRegex = /^[0-9]{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!expiryDateRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (validated) {
      validateForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirmOrder = () => {
    onOrderComplete({
      orderDetails: {
        items: cartItems,
        total,
        shipping,
        customerInfo: formData
      }
    });
    navigate('/confirmation');
  };

  if (cartItems.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Checkout</h1>
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className={validated ? 'was-validated' : ''}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Shipping Information</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.postalCode && (
                      <div className="invalid-feedback">{errors.postalCode}</div>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.country && (
                      <div className="invalid-feedback">{errors.country}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Payment Information</h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    {errors.cardNumber && (
                      <div className="invalid-feedback">{errors.cardNumber}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                    {errors.expiryDate && (
                      <div className="invalid-feedback">{errors.expiryDate}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                    {errors.cvv && (
                      <div className="invalid-feedback">{errors.cvv}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>VAT (20%):</span>
                  <span>${vat.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100">
              Place Order
            </button>
          </form>
        </div>
      </div>
      {/* Order Confirmation Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} 
           style={{ display: showModal ? 'block' : 'none' }}
           tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Your Order</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <h6 className="mb-3">Order Summary</h6>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th className="text-end">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map(item => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <h6>Shipping Address</h6>
                        <p className="mb-0">{formData.firstName} {formData.lastName}</p>
                        <p className="mb-0">{formData.address}</p>
                        <p className="mb-0">{formData.city}, {formData.postalCode}</p>
                        <p>{formData.country}</p>
                      </div>
                      <div className="col-md-6">
                        <div className="text-md-end">
                          <p className="mb-1">Subtotal: ${subtotal.toFixed(2)}</p>
                          <p className="mb-1">Shipping: ${shipping.toFixed(2)}</p>
                          <p className="mb-1">VAT (20%): ${vat.toFixed(2)}</p>
                          <h5>Total: ${total.toFixed(2)}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Back</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Checkout;