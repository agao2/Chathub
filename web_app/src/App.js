import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Chatroom from './components/Chatroom'
import Navibar from './components/Navibar'
class App extends Component {

  render() {
    return (
      <div className="App">
        <Navibar></Navibar>
        <Chatroom></Chatroom>
      </div>
    );
  }
}

export default App;
