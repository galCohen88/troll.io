import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useSocket } from '../socket';

export function LoginForm(props) {
  const [user, setUser] = useState(null);
  const socket = useSocket();

  function handleChange(event) {
    setUser(event.target.value);
  }

  function handleLogin(event) {
    axios.post('http://ec2-52-91-163-171.compute-1.amazonaws.com/login', {user})
    .then((response) => {
      const isLogged = response.data.loggedIn;
      if (!isLogged){
        alert('User not found')
      }
      isLogged && handleLoginTrue(user, response);
    })
    .catch((error) => {
      alert('Problem logging in');
      console.log("Problem logging in:", error);
    });
    event.preventDefault();
  }

  function handleLoginTrue(user, response) {
      socket.connect(user);
      props.appHandler(user, response.data.scores);
  }

  return (
    <div>
        <div className="title">
            <label>TROLL.IO</label>
        </div>
        <div>
            <form onSubmit={handleLogin}>
                <label>
                    <input type="text" className='Text-box' value={user} onChange={handleChange} placeholder="User email" />
                </label>
                <input type="submit" className='Submit' value="Login" />
            </form>
        </div>
    </div>
  );
}
