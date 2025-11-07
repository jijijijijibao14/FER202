// AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import UserListPage from '../pages/UserListPage';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Trang Đăng nhập */}
        <Route path="/" element={<LoginPage />} />

        {/* Trang mặc định */}
        <Route path="/" element={<Navigate to="/home" replace />} />
       
        {/* Trang Home/Dashboard */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Trang User Management */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserListPage />
            </PrivateRoute>
          }
        />

        {/* Tất cả route khác → /home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;