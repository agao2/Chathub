import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {HubConnectionBuilder} from '@aspnet/signalr'
import {addConnection,deleteConnection} from './actions/HubConnections'
import {connect} from 'react-redux'
import Chatroom from './components/Chatroom'
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

    // need to add hubConnection to redux! 

    const hubConnection =  await new HubConnectionBuilder()
    .withUrl('http://localhost:5000/chathub')
    .build();
  
    this.props.addConnection(hubConnection)

    
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
    // console.log("sendMessage");
    // console.log(this.props)
    // this.state.hubConnection
    //   .invoke('sendMessage' , this.state.nick, 'Hello World');
  }



  render() {
    return (
      <div className="App">
          <Chatroom></Chatroom>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addConnection: hubConnection => dispatch(addConnection(hubConnection)),
    deleteConnection: hubConnection => dispatch(deleteConnection(hubConnection))
  };
}

function mapStateToProps(state) {
  return {
    HubConnections: state.HubConnections
  }
}



export default connect( mapStateToProps,mapDispatchToProps)(App);
