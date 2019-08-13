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

    FormRow = (row, index) => {
        return (
            <React.Fragment key={index}>
                <Grid container item xs={12} spacing={0}>
                    {row.map((column, index) => (
                        <Grid item xs={4} key={index} className="GridItemCenter">
                            <CardWrapper {...column} history={this.props.history} ></CardWrapper>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        );
    }


    // takes an array and chunks it into sizes
    chunkArray(array, chunk_size) {
        var index = 0;
        var arrayLength = array.length;
        var tempArray = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = array.slice(index, index + chunk_size);
            tempArray.push(myChunk);
        }
        return tempArray;
    }


    render = () => {
        if (this.props.Chatrooms.loading) {
            return null;
        }

        let rows = [];
        if (this.props.Chatrooms.data.length > 0) {
            rows = this.chunkArray(this.props.Chatrooms.data, 3)
        }


        return (
            <div >
                <Grid container spacing={8}>
                    {rows.map((row, index) => (this.FormRow(row, index)))}
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
