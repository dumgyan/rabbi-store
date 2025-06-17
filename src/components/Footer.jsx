import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-3">Rabbi's Store</h5>
            <p className="mb-0">Your one-stop shop for quality products at great prices.</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/cart" className="text-light text-decoration-none">Cart</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@rabbisstore.com</li>
              <li>Phone: (020) 527-0666</li>
              <li>Address: 123 Store Street, Accra, Ghana</li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Rabbi's Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;