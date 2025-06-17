import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="card h-100">
      <div className="card-img-container" style={{ height: '400px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
        <img 
          src={imageError ? 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"%3E%3Cpath fill="%23ccc" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/%3E%3C/svg%3E' : product.image} 
          className="card-img-top" 
          alt={product.name} 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={handleImageError}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text"><small className="text-muted">Category: {product.category}</small></p>
        <div className="mt-auto">
          <p className="card-text fw-bold">${product.price.toFixed(2)}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <Link to={`/product/${product.id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;