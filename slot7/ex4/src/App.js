import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
