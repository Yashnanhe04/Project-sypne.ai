import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  // Logout function
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const userInfo = localStorage.getItem('userInfo'); // Check if the user is logged in

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-white font-bold text-2xl tracking-wide">
          Car<span className="text-yellow-300">Management</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {!userInfo ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/products"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Product List
              </Link>
              <Link
                to="/product/create"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Add Product
              </Link>
              <button
                onClick={logoutHandler}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-600 text-white">
          <div className="px-4 py-2 space-y-2">
            {!userInfo ? (
              <>
                <Link
                  to="/login"
                  className="block hover:bg-indigo-500 rounded px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block hover:bg-indigo-500 rounded px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block hover:bg-indigo-500 rounded px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/products"
                  className="block hover:bg-indigo-500 rounded px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Product List
                </Link>
                <Link
                  to="/product/create"
                  className="block hover:bg-indigo-500 rounded px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Product
                </Link>
                <button
                  onClick={() => {
                    logoutHandler();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
