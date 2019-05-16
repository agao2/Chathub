import React, { Component } from 'react';
import CardWrapper from '../CardWrapper'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
class Chathub extends Component {



    FormRow = (props) => {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <CardWrapper></CardWrapper>
                </Grid>
                <Grid item xs={4}>
                    <CardWrapper></CardWrapper>
                </Grid>
                <Grid item xs={4}>
                    <CardWrapper></CardWrapper>
                </Grid>
            </React.Fragment>
        );
    }


    render = () => {
        return (
            <div >
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={0}>
                        {this.FormRow()}
                    </Grid>
                    <Grid container item xs={12} spacing={0}>
                        {this.FormRow()}
                    </Grid>
                    <Grid container item xs={12} spacing={0}>
                        {this.FormRow()}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Chathub;