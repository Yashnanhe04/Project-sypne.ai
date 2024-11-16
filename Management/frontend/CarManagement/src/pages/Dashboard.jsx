import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-4xl transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Welcome to <span className="text-indigo-600">Car Management</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/product/create"
            className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-6 px-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl">🚗</span>
            <span className="mt-2 text-lg">Add New Car</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold py-6 px-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl">📋</span>
            <span className="mt-2 text-lg">View My Cars</span>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            Your <span className="text-purple-600">Dashboard</span>
          </h3>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            Manage your car collection seamlessly. Add new vehicles, view details, and organize everything in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
