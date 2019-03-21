import React, { Component } from 'react';

class Messages extends Component {

    // constructor(props) {
    //     super(props);
    // }

    renderMessage(message,index) {
        const { member, text } = message;
        const { currentMember } = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className} key = {index}>
                <span
                    className="avatar"
                    style={{ backgroundColor: member.color }}
                />
                <div className="Message-content">
                    <div className="username">
                        {member.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }

    render() {
        const { messages } = this.props;
        return (
            <ul className="Message-list">
                {messages.map( (m,index) => this.renderMessage(m,index))}
            </ul>
        )
    }
}

export default Messages;