import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createChatroom, getChatrooms } from '../../actions/ChatroomActions'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Chatroom from '../Chatroom';

class Chathub extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // fetch all the chatrooms that a user is a member of, also fetch any generic chatrooms like "general"
    this.props.getChatrooms();
  }

  render = () => {
    console.log(this.props);
    return (
      <div style={{ display: 'flex' }}>
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
          <List>
            {['Thread1', 'Thread2', 'Thread3', 'Thread4'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {/* <Divider />*/}
        </Drawer>
        <main style={{
          padding: 10,
          width: '100%'
        }}>
          <div style={{
            height: 64
          }} />
          {/* TODO: IF USER IS NOT LOGGED IN, SHOW A DIFFERENT SCREEN */}
          <Chatroom room="general" {...this.props} ></Chatroom>
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
