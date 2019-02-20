import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {HubConnectionBuilder} from '@aspnet/signalr'

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      nick: 'John',
      message: ' ',
      messages: [],
      hubConnection: null,
    }
  }

  componentDidMount = async () => {
    const hubConnection =  await new HubConnectionBuilder()
    .withUrl('http://localhost:5000/chathub')
    .build();
  
    this.setState({hubConnection : hubConnection});

    try {
      await this.state.hubConnection.start();
      console.log('Connection started');
    }
    catch(err) {
      console.log('Error making connection');
    }

    this.state.hubConnection.on('receivemessage' , (user, message) => {
      console.log("recievedMEssage");
    });
  }

  sendMessage = () => {
    console.log("sendMessage");
    this.state.hubConnection
      .invoke('sendMessage' , this.state.nick, 'Hello World');
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <br/>
          <button onClick={this.sendMessage}> SEND </button>
        </header>
      </div>
    );
  }
}

export default App;
