import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function Payment() {
  const [cart, setCart] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(
      storedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }))
    );
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const handlePayment = () => {
    if (!cardNumber || !cardHolder || !cvv || !billingAddress) {
      alert('Please complete all payment and address fields.');
      return;
    }

    alert('Payment successful! Your order is confirmed.');
  };

  return (
    <div>
      <Navbar />

      <div className='payment-page'>
        <div className='payment-container'>
          <h1>Payment Page</h1>

          <div className='order-summary-box'>
            <h2>Order Summary</h2>
            <p>Items: {cart.length}</p>
            <p>Subtotal: ₹ {subtotal}</p>
            <p>Shipping: ₹ {shipping}</p>
            <h3>Total: ₹ {total}</h3>
          </div>

          <div className='billing-section'>
            <h2>Billing Address</h2>
            <input
              type='text'
              placeholder='Billing address'
              value={billingAddress}
              onChange={(event) => setBillingAddress(event.target.value)}
            />
          </div>

          <div className='payment-method'>
            <h2>Payment Method</h2>
            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
              <option value='Credit Card'>Credit Card</option>
              <option value='Debit Card'>Debit Card</option>
              <option value='UPI'>UPI</option>
              <option value='Wallet'>Wallet</option>
            </select>
          </div>

          <input
            type='text'
            placeholder='Card Number'
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
          />

          <input
            type='text'
            placeholder='Card Holder Name'
            value={cardHolder}
            onChange={(event) => setCardHolder(event.target.value)}
          />

          <input
            type='text'
            placeholder='CVV'
            value={cvv}
            onChange={(event) => setCvv(event.target.value)}
          />

          <button onClick={handlePayment}>Pay Now</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;