import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterPage from './pages/footerpage';
import HomePage from './pages/homepage';
import MoviePage from './pages/moviepage';
import NavPage from './pages/navpage';

function App() {
  return (
    <div className="App">
      < NavPage/>
      < HomePage />
      < MoviePage />
      < FooterPage />
      
    </div>
  );
}

export default App;
