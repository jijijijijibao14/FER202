import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bước 3 tài liệu
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes';
import { MotorbikeProvider } from './contexts/MotorbikeContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
     <AuthProvider>
      <MotorbikeProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </MotorbikeProvider>
    </AuthProvider>
  );
}

export default App;