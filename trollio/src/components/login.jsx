import React from 'react';
import axios from 'axios';
import './login.css';

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {loggedIn: '', user: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }
  
    handleChange(event) {
      this.setState({user: event.target.value});
    }
  
    handleLogin(event) {
      let res = axios.post('http://ec2-52-91-163-171.compute-1.amazonaws.com/login', {user: this.state.user})
      .then((response) => {
        alert(JSON.stringify(response.data))
        return response
      })
      .catch((error) => {
        alert('catch')
      });
      event.preventDefault();
    }
  
    render() {
      return (
          <div>
              <div className="title">
                  <label>TROLLIO</label>
              </div>
              <div>
                  <form onSubmit={this.handleLogin}>
                      <label>
                          <input type="text" className='Text-box' value={this.state.user} onChange={this.handleChange} placeholder="User email" />
                      </label>
                      <input type="submit" value="Login" />
                  </form>
              </div>
          </div>
      );
    }
  }

  export { LoginForm };