function ProductCard({ product, addToCart }) {
  return (
    <div className='card'>
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>₹ {product.price}</p>

      <span>{product.offer}</span>

      <button onClick={() => addToCart(product)}>
        Add To Cart
      </button>
    </div>
  );
}
export default ProductCard;