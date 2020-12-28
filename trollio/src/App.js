import logo from './rotate.png';
import './App.css';
import { useEffect } from 'react'
import WebSocket from './socket' 
import { LoginForm } from './components/login'

function App() {
  let user = 'gal.cohen@autodesk.com';

  useEffect((user) => {
    const socket = new WebSocket();
    socket.connect(user);
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <LoginForm className='Login-form'/>
        </p>
      </header>
    </div>
  );
}

export default App;
