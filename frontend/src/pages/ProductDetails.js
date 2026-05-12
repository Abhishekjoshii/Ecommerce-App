import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProducts();
    addToRecentlyViewed(parseInt(id));
  }, [id]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setAllProducts(response.data);
      const found = response.data.find((p) => p.id === parseInt(id));
      setProduct(found);

      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setIsFavorite(wishlist.some((item) => item.id === parseInt(id)));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToRecentlyViewed = (productId) => {
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    recentlyViewed = recentlyViewed.filter((p) => p !== productId);
    recentlyViewed.unshift(productId);
    if (recentlyViewed.length > 10) recentlyViewed.pop();
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    for (let i = 0; i < quantity; i++) {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (isFavorite) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
      alert('Removed from Wishlist');
    } else {
      wishlist.push(product);
      alert('Added to Wishlist');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsFavorite(!isFavorite);
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== parseInt(id))
    .slice(0, 4);

  if (!product) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <h2>Loading product details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className='product-details-page'>
        <button className='back-button' onClick={() => navigate('/home')}>
          ← Back
        </button>

        <div className='product-details-container'>
          <div className='details-image'>
            <img src={product.image} alt={product.name} />
          </div>

          <div className='details-info'>
            <h1>{product.name}</h1>
            <p className='offer-label'>{product.offer}</p>
            <p className='price'>₹ {product.price}</p>

            <div className='quantity-selector'>
              <label>Quantity:</label>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className='action-buttons'>
              <button className='add-to-cart-btn' onClick={addToCart}>
                Add to Cart
              </button>
              <button
                className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
                onClick={toggleWishlist}
              >
                {isFavorite ? '❤️ Wishlist' : '🤍 Wishlist'}
              </button>
            </div>

            <div className='product-description'>
              <h3>Product Details</h3>
              <ul>
                <li>High quality product</li>
                <li>Free shipping on orders over ₹500</li>
                <li>30 days easy return policy</li>
                <li>1 year warranty included</li>
                <li>Secure payment options</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='related-products-section'>
          <h2>Related Products</h2>
          <div className='related-products-grid'>
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className='related-product-card'
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img src={p.image} alt={p.name} />
                <h4>{p.name}</h4>
                <p>₹ {p.price}</p>
                <span>{p.offer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
