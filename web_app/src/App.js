import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Chatroom from './components/Chatroom'
import Navbar from './components/Navbar'
class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <Chatroom></Chatroom>
      </div>
    );
  }
}

export default App;
