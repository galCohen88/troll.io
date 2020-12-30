import logo from './rotate.png';
import './App.css';
import { LoginForm } from './components/login'
import { Dashboard } from './components/dashboard'
import React from 'react';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            scores: [],
            currentUser: null,
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(user, scores) {
        this.setState({
            isLoggedIn: true,
            scores: scores,
            currentUser: user,
        })
    }

    renderContent() {
        if (!this.state.isLoggedIn) {
            return <LoginForm className='Login-form' appHandler={this.handleLogin}/>
        }
        return <Dashboard scores={this.state.scores} currentUser={this.state.currentUser} />
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        {this.renderContent()}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
