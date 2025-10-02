import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/navbar';
import Carousel from './components/carousel';
import Menu from './components/menu';
import Booking from './components/booking';

function App() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Menu />
      <Booking />
    </div>
  );
}

export default App;
