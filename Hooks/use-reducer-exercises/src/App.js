import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/Exercise1';
import ToggleLight from './components/Exercise2';
import QuestionBank from  './components/QuestionBank';
import LoginForm from './components/Exercise3';
import RegisterForm from './components/Exercise4'

function App() {
  return (
    <div className="App">
      <CounterComponent/>
      <ToggleLight/>
      <QuestionBank/>
      <LoginForm/>
      <RegisterForm/>
    </div>
  );
}

export default App;
