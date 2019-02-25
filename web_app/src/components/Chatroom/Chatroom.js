import React, { Component } from 'react';
import Messages from '../Messages'
import Input from '../Input'
import './Chatroom.css'

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    text: "This is a test message!",
                    member: {
                        id:1,
                        color: "blue",
                        username: "bluemoon"
                    }
                }
            ],
            member: {
                id:2,
                username: "Computer",
                color: "Green"
            }
        }
    }

    onSendMessage = (message) => {
        const messages = this.state.messages
        messages.push({
            text: message,
            member: this.state.member
        })
        this.setState({ messages: messages })
    }

    render() {
        return (
            <div>
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

export default Chatroom