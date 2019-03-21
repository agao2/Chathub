import React, { Component } from 'react';
import './Routes.css'
import Chatroom from '../Chatroom'
import Navibar from '../Navibar'


class Routes extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Navibar {...this.props} ></Navibar>
                <Chatroom {...this.props} ></Chatroom>
            </div>
        )
    }
}

export default Routes