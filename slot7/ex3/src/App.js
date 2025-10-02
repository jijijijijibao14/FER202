import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import  Banner  from './components/banner';
import Navbar from './components/navbar';
import Grid from './components/grid';
import Footer from './components/footer';

function App() {
  return (
    <div >
      <Banner />
      <Navbar />
      <Grid />
      <Footer />
    </div>
  );
}

export default App;
