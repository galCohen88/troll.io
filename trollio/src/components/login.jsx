import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useSocket } from '../socket';

import { popUp } from './popup'
import { ReceiverModal } from './receiverModal'

export function LoginForm(props) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const socket = useSocket();

  function handleChange(event) {
    setUser(event.target.value);
  }

  function handleLogin(event) {
    // popUp(`https://youtu.be/jW7fi-9MRUQ?t=38`)
    popUp(`https://www.247backgammon.org/`)
    axios.post('http://ec2-52-91-163-171.compute-1.amazonaws.com/login', {user})
    .then((response) => {
      const isLogged = response.data.loggedIn;
      setIsLogged(isLogged);
      isLogged && socket.connect(user);
    })
    .catch((error) => {
      alert('Problem logging in')
    });
    event.preventDefault();
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
        <div>
          <ReceiverModal/>
        </div>
    </div>
  );
}

// class LoginForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {loggedIn: '', user: ''};
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleLogin = this.handleLogin.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({user: event.target.value});
//     }
  
//     handleLogin(event) {
//       axios.post('http://ec2-52-91-163-171.compute-1.amazonaws.com/login', {user: this.state.user})
//       .then((response) => {
//         this.setState({loggedIn: response.data.loggedIn})
//       })
//       .catch((error) => {
//         alert('Problem logging in')
//       });
//       event.preventDefault();
//     }
  
//     render() {
//       return (
//           <div>
//               <div className="title">
//                   <label>TROLLIO</label>
//               </div>
//               <div>
//                   <form onSubmit={this.handleLogin}>
//                       <label>
//                           <input type="text" className='Text-box' value={this.state.user} onChange={this.handleChange} placeholder="User email" />
//                       </label>
//                       <input type="submit" value="Login" />
//                   </form>
//               </div>
//           </div>
//       );
//     }
//   }

//   export { LoginForm };