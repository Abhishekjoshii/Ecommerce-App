import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(wishlist);
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlistItems.filter((item) => item.id !== productId);
    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    alert('Removed from Wishlist');
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to Cart');
  };

  return (
    <div>
      <Navbar />

      <div className='wishlist-page'>
        <h1>My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className='empty-wishlist'>
            <p>Your wishlist is empty.</p>
            <button onClick={() => navigate('/home')} className='continue-shopping-btn'>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className='wishlist-container'>
            <div className='wishlist-grid'>
              {wishlistItems.map((product) => (
                <div className='wishlist-card' key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className='price'>₹ {product.price}</p>
                  <p className='offer'>{product.offer}</p>

                  <div className='wishlist-actions'>
                    <button
                      className='view-btn'
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className='add-to-cart-wishlist-btn'
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className='remove-btn'
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
