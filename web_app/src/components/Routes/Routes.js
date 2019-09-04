import React, { Component } from 'react';
import './Routes.css'
import Chatroom from '../Chatroom'
import Navbar from '../Navbar'
import Chathub from '../Chathub'
import { Route, Switch } from 'react-router-dom'


class Routes extends Component {

    render() {
        return (
            <div style={{height:'100%'}}>
                <Navbar {...this.props} ></Navbar>
                <Switch>
                    {/* <Route path="/chatroom" component={(routeProps) => <Chatroom {...this.props} {...routeProps} />} /> */}
                    <Route path="/" component={(routeProps) => <Chathub {...this.props} {...routeProps} />} />
                </Switch>
            </div>
        )
    }
}

export default Routes