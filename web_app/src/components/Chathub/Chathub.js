import React, { Component } from 'react';
import CardWrapper from '../CardWrapper'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { createChatroom, getChatrooms } from '../../actions/ChatroomActions'
import './Chathub.css'
class Chathub extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // fetch all the chatrooms that a user is a member of, also fetch any generic chatrooms like "general"
        this.props.getChatrooms();
    }

    FormRow = (props) => {
        return (
            <React.Fragment>
                <Grid container item xs={12} spacing={0}>
                    <Grid item xs={4} className="GridItemCenter">
                        <CardWrapper {...props} ></CardWrapper>
                    </Grid>
                    <Grid item xs={4} className="GridItemCenter" >
                        <CardWrapper {...props}></CardWrapper>
                    </Grid>
                    <Grid item xs={4} className="GridItemCenter">
                        <CardWrapper {...props}></CardWrapper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }


    render = () => {
        return (
            <div >
                <Grid container spacing={8}>
                    {this.FormRow(this.props)}
                    {this.FormRow(this.props)}
                    {this.FormRow(this.props)}
                </Grid>
            </div>
        )
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
