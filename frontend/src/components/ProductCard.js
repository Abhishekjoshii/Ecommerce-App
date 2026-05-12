import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (isFavorite) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      wishlist.push(product);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className='card' onClick={() => navigate(`/product/${product.id}`)}>
      <button className='wishlist-icon' onClick={toggleWishlist}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>₹ {product.price}</p>

      <span>{product.offer}</span>

      <button
        className='add-to-cart-card-btn'
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}
export default ProductCard;