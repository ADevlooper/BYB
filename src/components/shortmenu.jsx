import { useState, useEffect } from 'react';

function Shortmenu() {
  const [activeCategory, setActiveCategory] = useState('beverages');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['beverages', 'desserts', 'fruits', 'condiments']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category/groceries');
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.tags.includes(activeCategory));

  const calculateOriginalPrice = (price, discountPercentage) => {
    return (price / (1 - discountPercentage / 100)).toFixed(2);
  };

  if (loading) {
    return <div className="text-center p-10">Loading menu...</div>;
  }

  return (
    <div className="p-5 font-sans mx-4 ">
      <h1 className="text-left text-3xl md:mt-12 mt-7 md:mb-12 mb-7">Fresh bakes. Fast delivery. Pure happiness!</h1>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="flex-1 md:mr-5 gap-7">
          <ul className="list-none p-0 md:mt-10 flex flex-wrap md:block gap-4 md:gap-0">
            {categories.map((category) => (
              <li
                key={category}
                className={`md:mb-7 cursor-pointer transition-all duration-300 capitalize ${activeCategory === category
                  ? 'text-red-800 md:text-3xl text-2xl font-bold'
                  : 'text-lg md:text-2xl hover:text-red-800 hover:text-3xl'
                  }`}
                onMouseEnter={() => handleMouseEnter(category)}
                onClick={() => setActiveCategory(category)} // Add click for mobile/touch
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 md:mt-0 w-full">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              <div className="h-60 bg-white flex items-center justify-center relative p-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
                <button className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-bold text-red-800">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">
                    ${calculateOriginalPrice(product.price, product.discountPercentage)}
                  </span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 border-2 border-red-800 text-red-800 px-4 py-2 rounded-md hover:bg-red-800 hover:text-white transition-colors text-center flex items-center justify-center gap-2 text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-900 transition-colors text-center flex items-center justify-center gap-2 text-sm">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shortmenu;
