import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    tags: '',
    images: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://car-management-application-nhas.onrender.com/api/cars/${id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
            },
          }
        );
        setProduct(data);
        setUpdatedProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again.');
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `https://car-management-application-nhas.onrender.com/api/cars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        }
      );
      navigate('/products');
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, images: e.target.files });
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('title', updatedProduct.title);
      formData.append('description', updatedProduct.description);
      formData.append('tags', updatedProduct.tags);

      if (updatedProduct.images.length > 0) {
        Array.from(updatedProduct.images).forEach((image) => {
          formData.append('images', image);
        });
      }

      await axios.put(
        `https://car-management-application-nhas.onrender.com/api/cars/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      navigate(`/products`);
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        {error && (
          <p className="text-red-600 font-semibold text-center mb-4">{error}</p>
        )}

        {!isEditing ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600 text-center mb-6 text-lg">
              {product.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.images &&
                product.images.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={`https://car-management-application-nhas.onrender.com/${image}`}
                      alt={product.title}
                      className="w-full h-60 object-cover"
                    />
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
              Edit Product
            </h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={updatedProduct.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={updatedProduct.tags}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Images
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
                  onClick={async () => {
                    await updateProduct();
                    setIsEditing(false);
                  }}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transition"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex justify-center space-x-4 mt-8">
          <button
            className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 transition"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={deleteProduct}
          >
            Delete
          </button>
          {!isEditing && (
            <button
              className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
