// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoginPage from '../pages/LoginPage';
import ListMotorbikePage from '../pages/ListMotorbikePage';
import CartPage from "../pages/CartPage";

// Component bảo vệ route
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/" element={<LoginPage />} />

        {/* Trang danh sách xe máy (chỉ truy cập sau khi login) */}
        <Route
          path="/motorbikes"
          element={
            <PrivateRoute>
              <ListMotorbikePage />
            </PrivateRoute>
          }
        />

        <Route path="/cart" element={<CartPage />} />

        {/* Route mặc định */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
