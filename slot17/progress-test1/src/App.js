import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
              path="/home"
              element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
}

export default App;
