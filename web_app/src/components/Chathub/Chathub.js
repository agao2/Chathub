import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createChatroom, getChatrooms } from '../../actions/ChatroomActions'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Chatroom from '../Chatroom';
import Typography from '@material-ui/core/Typography';
import { HubConnectionBuilder } from '@aspnet/signalr'
// import _ from 'lodash'

class Chathub extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentRoom: "General",
      connectionStarted: false
    }
  }

  componentDidMount = async () => {
    // fetch all the chatrooms that a user is a member of, also fetch any generic chatrooms like "general"
    this.props.getChatrooms();


    this.setState({ connectionStarted: false });
    const hubConnection = await new HubConnectionBuilder()
      .withUrl('/chathub')
      .build();

    this.setState({ hubConnection: hubConnection });
    try {
      await this.state.hubConnection.start();
      this.setState({ connectionStarted: true });
    }
    catch (err) {
      console.log(`Error making a connect: ${err}`);
    }
  }

  onSideBarClick = (room) => {
    this.setState({
      currentRoom: room
    })
  }

  render = () => {
    if (this.props.Chatrooms.loading) {
      // return a loader of sorts
      return <div></div>
    }

    return (
      <div style={{ display: 'flex' , height:'100%' }}>
        <Drawer
          style={{
            width: 240,
            flexShrink: 0
          }}
          variant="permanent"
        >
          <div style={{
            width: 240,
            flexShrink: 0,
            height: 64
          }} />
          <ListItem>
            <Typography variant="subtitle2"> Channels </Typography>
          </ListItem>
          <Divider />
          <List>
            {this.props.Chatrooms.data.map((room, index) => (
              <ListItem button key={room.name} onClick={() => this.onSideBarClick(room.name)}>
                <MeetingRoomIcon />
                <ListItemText primary={room.name} />
              </ListItem>
            ))}
            <ListItem button key={"createRoom"}>
              <AddIcon />
              <ListItemText primary={"Create channel"} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main style={{
          padding: 10,
          width: '100%'
        }}>
          <div style={{
            height: 64
          }} />
          {this.state.connectionStarted ?
            <Chatroom key={this.state.currentRoom} room={this.state.currentRoom} {...this.props} hubConnection={this.state.hubConnection}></Chatroom> : ""
          }
        </main>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    getChatrooms: () => dispatch(getChatrooms()),
    createChatroom: (chatroom) => dispatch(createChatroom(chatroom))
  }
}

function mapStateToProps(state) {
  return {
    Chatrooms: state.Chatrooms
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chathub);
