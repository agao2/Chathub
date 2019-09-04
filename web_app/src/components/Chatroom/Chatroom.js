import React, { Component } from 'react';
import Messages from '../Messages'
import Input from '../Input'
import './Chatroom.css'
import { HubConnectionBuilder } from '@aspnet/signalr'

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.room = props.room;
        this.state = {
            messages: [],
            member: {}
        }
    }

    componentDidMount = async () => {
        const hubConnection = await new HubConnectionBuilder()
            .withUrl('/chathub')
            .build();

        this.setState({ hubConnection: hubConnection });

        try {
            await this.state.hubConnection.start();

            this.state.hubConnection.invoke("addToGroup", this.props.User.username, this.room || "default")

            this.state.hubConnection.on('receivemessage', (user, message) => {
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
            });
        }
        catch (err) {
            // console.log(`Error making a connect: ${err}`);
        }
    }

    onSendMessage = (message) => {
        this.state.hubConnection.invoke('SendMessageToGroup', this.room, this.props.User.username, message);
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



export default Chatroom;

