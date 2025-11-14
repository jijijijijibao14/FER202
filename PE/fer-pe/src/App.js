import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bước 3 tài liệu
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
          <AppRoutes />
    </AuthProvider>
  );
}

export default App;
