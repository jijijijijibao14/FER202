import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bước 3 tài liệu
import { AuthProvider } from './contexts/AuthContext.jsx';
import { PaymentProvider } from './contexts/PaymentContext.jsx';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <AppRoutes />
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;