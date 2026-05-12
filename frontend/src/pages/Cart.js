import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function Cart() {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(
      storedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }))
    );
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const changeQuantity = (index, delta) => {
    const updated = [...cart];
    const item = { ...updated[index] };
    item.quantity = Math.max(1, item.quantity + delta);
    updated[index] = item;
    saveCart(updated);
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, idx) => idx !== index);
    saveCart(updated);
  };

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SAVE10' && cart.length > 0) {
      setDiscount(10);
      setMessage('Promo applied: ₹10 off');
    } else {
      setDiscount(0);
      setMessage('Invalid coupon code');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping - discount;

  const recommendations = [
    {
      id: 101,
      name: 'Portable Charger',
      price: 1200,
      image: 'https://www.travelandleisure.com/thmb/eIzZNIMJ76dCqn8p2R_YH2JdRas=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Best-Portable-Chargers-of-2024-tout-bd0829ba3e8b404db7b89ea04d10ed9a.jpg',
    },
    {
      id: 102,
      name: 'Wireless Earbuds',
      price: 3300,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    },
    {
      id: 103,
      name: 'Laptop Sleeve',
      price: 900,
      image: 'https://th.bing.com/th/id/OIP.KShbkVSRMqICWoJv1YFDIgHaHU?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
  ];

  return (
    <div>
      <Navbar />

      <div className='cart-page'>
        <div className='cart-container'>
          <h1>Cart Items</h1>

          {cart.length === 0 ? (
            <p className='empty-message'>Your cart is currently empty.</p>
          ) : (
            cart.map((item, index) => (
              <div className='cart-item' key={index}>
                <img src={item.image} alt={item.name} />

                <div className='cart-item-details'>
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>
                  <div className='quantity-controls'>
                    <button onClick={() => changeQuantity(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(index, 1)}>+</button>
                  </div>
                  <button className='remove-button' onClick={() => removeItem(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}

          <div className='promo-section'>
            <h2>Apply Promo</h2>
            <div className='promo-input'>
              <input
                type='text'
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
                placeholder='Enter coupon code'
              />
              <button onClick={applyPromo}>Apply</button>
            </div>
            {message && <p className='promo-message'>{message}</p>}
          </div>

          <div className='summary-box'>
            <h2>Order Summary</h2>
            <p>Subtotal: ₹ {subtotal}</p>
            <p>Shipping: ₹ {shipping}</p>
            <p>Discount: ₹ {discount}</p>
            <h3>Total: ₹ {total}</h3>
          </div>
        </div>

        <div className='recommendation-panel'>
          <h2>Recommended For You</h2>
          <div className='recommendation-list'>
            {recommendations.map((product) => (
              <div className='recommendation-card' key={product.id}>
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>₹ {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;