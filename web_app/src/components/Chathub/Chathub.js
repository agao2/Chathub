import React, { Component } from 'react';
import CardWrapper from '../CardWrapper'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Chathub.css'
class Chathub extends Component {

    constructor(props){
        super(props)
        console.log(props);
    }

    FormRow = (props) => {
        return (
            <React.Fragment>
                <Grid container item xs={12} spacing={0}>
                    <Grid item xs={4} className = "GridItemCenter">
                        <CardWrapper {...props} ></CardWrapper>
                    </Grid>
                    <Grid item xs={4} className = "GridItemCenter" >
                        <CardWrapper {...props}></CardWrapper>
                    </Grid>
                    <Grid item xs={4} className = "GridItemCenter">
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

export default Chathub;