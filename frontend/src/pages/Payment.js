import Navbar from '../components/Navbar';

function Payment() {
  return (
    <div>
      <Navbar />

      <div className='payment-container'>
        <h1>Payment Page</h1>

        <input type='text' placeholder='Card Number' />

        <input type='text' placeholder='Card Holder Name' />

        <input type='text' placeholder='CVV' />

        <button>Pay Now</button>
      </div>
    </div>
  );
}

export default Payment;