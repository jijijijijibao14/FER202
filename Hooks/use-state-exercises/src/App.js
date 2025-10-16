import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponents from './components/counter';
import LightSwitch from './components/OnOff';
import LoginForm from './components/Login';
import LoginForm2 from './components/Login2';
import SearchItem from './components/search';
import FindAccount from './components/FindAccount';
import RegisterForm from './components/Register';

function App() {
  return (
    <div className="App">
      <CounterComponents />
      <LightSwitch />
      <LoginForm />
      <LoginForm2 />
      <SearchItem />
      <FindAccount />
      <RegisterForm />
    </div>
  );
}

export default App;
