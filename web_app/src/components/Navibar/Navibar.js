import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import './Navibar.css'

class Navibar extends Component {
    onLogin = () => {
        this.props.history.push("/login");
    }

    render() {
        const isLoggedIn = this.props.User ? this.props.User.username : null
        return (
            <div>
            <AppBar style={{zIndex:1201}} >
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6" style={{flexGrow:1}}>
                  Chathub
                </Typography>
                {isLoggedIn
                  ? <Typography variant="h6">{this.props.User.username}</Typography>
                  : <Button color="inherit" onClick={this.onLogin} >Login</Button>
                }
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}


export default Navibar;
