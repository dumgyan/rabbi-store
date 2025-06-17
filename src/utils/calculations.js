// VAT rate (20%)
const VAT_RATE = 0.20;

// Fixed shipping cost
const SHIPPING_COST = 50;

// Shipping cost calculation
export const calculateShipping = () => {
  return SHIPPING_COST;
};

// VAT calculation
export const calculateVAT = (subtotal) => {
  return subtotal * VAT_RATE;
};

// Calculate order total
export const calculateTotal = (items) => {
  const subtotal = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const shipping = calculateShipping();
  const vat = calculateVAT(subtotal);

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    vat: Number(vat.toFixed(2)),
    total: Number((subtotal + shipping + vat).toFixed(2))
  };
};