const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2">
          <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="card-title">{item.name}</h5>
              <button 
                onClick={() => onRemove(item.id)} 
                className="btn btn-sm btn-danger"
                aria-label="Remove item"
              >
                ×
              </button>
            </div>
            <p className="card-text">${item.price.toFixed(2)}</p>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
              <span className="ms-3">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;