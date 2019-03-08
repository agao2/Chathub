import React, { Component } from 'react';
import './Routes.css'
import Chatroom from '../Chatroom'
import Navibar from '../Navibar'


class Routes extends Component {
    render(){
        return(
            <div>
                <Navibar></Navibar>
                <Chatroom></Chatroom>
            </div>
        )
    }
}

export default Routes