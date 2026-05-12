import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import OfferBanner from '../components/OfferBanner';
import api from '../api';
// import BannerSlider from '../BannerSlider';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const categories = ['All', 'Laptops', 'Phones', 'Audio', 'Wearables', 'Accessories', 'Clothing'];

  useEffect(() => {
    fetchProducts();
    loadRecentlyViewed();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  };

  const loadRecentlyViewed = () => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(viewed.slice(0, 4));
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({ ...product, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product Added To Cart');
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Laptops' && product.name.toLowerCase().includes('laptop')) ||
      (selectedCategory === 'Phones' && product.name.toLowerCase().includes('phone')) ||
      (selectedCategory === 'Audio' && (product.name.toLowerCase().includes('headphone') || product.name.toLowerCase().includes('speaker'))) ||
      (selectedCategory === 'Wearables' && product.name.toLowerCase().includes('watch')) ||
      (selectedCategory === 'Accessories' && (product.name.toLowerCase().includes('mouse') || product.name.toLowerCase().includes('keyboard'))) ||
      (selectedCategory === 'Clothing' &&
        (product.name.toLowerCase().includes('shirt') ||
         product.name.toLowerCase().includes('jeans') ||
         product.name.toLowerCase().includes('jacket') ||
         product.name.toLowerCase().includes('dress') ||
         product.name.toLowerCase().includes('hoodie') ||
         product.name.toLowerCase().includes('sneakers') ||
         product.name.toLowerCase().includes('shoes') ||
         product.name.toLowerCase().includes('sweater')));

    return matchesSearch && matchesCategory;
  });

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <Navbar />
     


      <OfferBanner />

      <div className='promo-banner'>
        <p>🎉 Apply promo code <strong>GOSALE</strong> to get <strong>10% discount</strong> on checkout!</p>
      </div>

      <div className='home-top'>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search products...'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className='category-list'>
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active-category' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <section className='featured-section'>
        <h2>Featured Picks</h2>
        <div className='products'>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {recentlyViewed.length > 0 && products.length > 0 && (
        <section className='recently-viewed-section'>
          <h2>Recently Viewed</h2>
          <div className='products'>
            {recentlyViewed
              .map((id) => products.find((p) => p.id === id))
              .filter((p) => p)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
          </div>
        </section>
      )}

      <section className='products-section'>
        <h2>All Products</h2>
        <div className='products'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className='empty-message'>No products match your search.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;