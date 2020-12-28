import React from 'react';
import users from '../users.json'
import './login.css';

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleLogin.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleLogin(event) {
      if (users.includes(this.state.value)){
          // TODO move users.json to BE, in rest API return True when exists
        alert('user ' + this.state.value + ' was found');
      }
      else{
        alert('user ' + this.state.value + ' was not found');
      }
      event.preventDefault();
    }
  
    render() {
      return (
          <div>
              <div class="title">
                  <label>TROLLIO</label>
              </div>
              <div>
                  <form onSubmit={this.handleSubmit}>
                      <label>
                          <input type="text" class='Text-box' value={this.state.value} onChange={this.handleChange} placeholder="User email" />
                      </label>
                      <input type="submit" value="Login" />
                  </form>
              </div>
          </div>
      );
    }
  }

  export { LoginForm };