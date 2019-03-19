import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Routes from './components/Routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path = "/" render={ (routeProps)=><Routes {...routeProps}/> } ></Route>
          <Route exact path ="/login" render={ (routeProps)=><Login {...routeProps} /> }></Route>
        </Switch>
      </div>
    );
  }
}

export default App;