import React, { Component } from 'react';
import './Login.css'

class Login extends Component {

    render() {
        return (
            <div className="box" >
              <h1>login</h1>
              <input type="text" name="username" id="username" placeholder="Username" autoComplete="off" />
              <input type="password" name="pass" id="pass" placeholder="Password" autoComplete="off" />
              <input type="submit" id="submit" defaultValue="login" />
            </div>
          );
    }


}

export default Login;