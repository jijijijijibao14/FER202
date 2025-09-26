import logo from './logo.svg';
import './App.css';
import { Exercise1 } from './components/exercise1';
import { Exercise2 } from './components/exercise2';
import { Exercise3 } from './components/exercise3';
import { Exercise4 } from './components/exercise4';
import { Exercise5 } from './components/exercise5';

function App() {
  return (
    <div className="App">
      <Exercise1 />
      <Exercise2 />
      <Exercise3 />
      <Exercise4 />
      <Exercise5 />
    </div>
  );
}

export default App;
