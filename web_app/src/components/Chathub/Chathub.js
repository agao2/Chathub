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
import { withStyles } from '@material-ui/core/styles';
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
    if (!this.props.Chatrooms || this.props.Chatrooms.loading) {
      // return a loader of sorts
      return <div></div>
    }
    return (
      <div className={this.props.classes.root}>
        <Drawer
          className={this.props.classes.drawer}
          variant="permanent"
          classes={{
            paper: this.props.classes.drawerPaper,
          }}
        >
          <div className={this.props.classes.toolbar} />
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
        <main className={this.props.classes.content} >
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

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
      height: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    },
  });


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chathub));
