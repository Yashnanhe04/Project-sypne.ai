import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
        if (!token) {
          setError('User is not logged in');
          return;
        }

        const { data } = await axios.get(
          `https://car-management-application-nhas.onrender.com/api/cars`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (Array.isArray(product.tags) &&
          product.tags.some((tag) => tag.toLowerCase().includes(query)))
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-12">
          Explore Cars
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by title, description, or tags..."
            className="p-4 w-full max-w-md rounded-full shadow-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400"
          />
        </div>

        {/* Product Grid */}
        {error && (
          <p className="text-red-600 text-center font-semibold mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-white text-center text-xl col-span-full">
              No products found.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img
                      src={
                        product.images[0]
                          ? `https://car-management-application-nhas.onrender.com/${product.images[0]}`
                          : 'https://via.placeholder.com/300'
                      }
                      alt={product.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
