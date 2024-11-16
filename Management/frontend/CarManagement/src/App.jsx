import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';
import Dashboard from './pages/Dashboard';

// Check if user is logged in (i.e., check localStorage for user info)
const PrivateRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Include Navbar component */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={<PrivateRoute><Dashboard /></PrivateRoute>} 
          />
          <Route 
            path="/products" 
            element={<PrivateRoute><ProductList /></PrivateRoute>} 
          />
          <Route 
            path="/product/create" 
            element={<PrivateRoute><ProductCreate /></PrivateRoute>} 
          />
          <Route 
            path="/product/:id" 
            element={<PrivateRoute><ProductDetail /></PrivateRoute>} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
