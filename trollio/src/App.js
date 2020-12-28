import logo from './rotate.png';
import './App.css';
import { LoginForm } from './components/login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <LoginForm className='Login-form'/>
        </div>
      </header>
    </div>
  );
}

export default App;
