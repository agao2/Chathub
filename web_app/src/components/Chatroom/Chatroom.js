import React, { Component } from 'react';
import Messages from '../Messages'
import Input from '../Input'
import './Chatroom.css'
import { HubConnectionBuilder } from '@aspnet/signalr'
import { addConnection, deleteConnection } from '../../actions/HubConnectionsActions'
import { connect } from 'react-redux'

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.room = new URLSearchParams(props.location.search).get("room"); 
        this.state = {
            messages: [
                {
                    text: "This is a test message!",
                    member: {
                        id: 1,
                        color: "blue",
                        username: "Fake User"
                    }
                }
            ],
            member: {
                id: 2,
                username: "Computer",
                color: "Green"
            }
        }
    }

    componentDidMount = async () => {
        const hubConnection = await new HubConnectionBuilder()
            .withUrl('/chathub')
            .build();

        this.props.addConnection(hubConnection)


        this.setState({ hubConnection: hubConnection });

        try {
            await this.state.hubConnection.start();
            console.log('Connection started');
        }
        catch (err) {
            console.log('Error making connection');
        }

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

        this.state.hubConnection.invoke("addToGroup", this.props.User.username, this.room || "default")
    }

    onSendMessage = (message) => {
        this.state.hubConnection.invoke('sendMessage', this.props.User.username, this.props.User.username, message);
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



export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);

