import React, { Component } from 'react';
import Messages from '../Messages'
import Input from '../Input'
import './Chatroom.css'

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.room = props.room;
        this.state = {
            messages: [],
            member: {},
        }
    }

    recieveMessage = (user, message) => {
        const messages = this.state.messages
        let member = {
            id: 2,
            username: user,
            color: "Yellow"
        }
        messages.push({
            text: message,
            member: member
        })
        this.setState({ messages: messages })
    };

    componentDidMount = async () => {
        try {
            this.props.hubConnection.invoke("addToGroup", this.props.User.username, this.room || "default")
            this.props.hubConnection.on(`receivemessage:${this.room}`, this.recieveMessage);
        }
        catch (err) {
            console.log(`Error adding user to a room: ${err}`);
        }
    }

    componentWillUnmount() {
        this.props.hubConnection.off('receivemessage', this.recieveMessage);
    }


    onSendMessage = (message) => {
        this.props.hubConnection.invoke('SendMessageToGroup', this.room, this.props.User.username, message);
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input
                    onSendMessage={this.onSendMessage}
                />
            </div>
        );
    }
}



export default Chatroom;

