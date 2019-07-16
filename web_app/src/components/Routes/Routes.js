import React, { Component } from 'react';
import './Routes.css'
import Chatroom from '../Chatroom'
import Navibar from '../Navibar'
import Chathub from '../Chathub'
import { Route, Switch } from 'react-router-dom'


class Routes extends Component {

    render() {
        return (
            <div>
                <Navibar {...this.props} ></Navibar>
                <Switch>
                    <Route path="/chatroom" component={(routeProps) => <Chatroom {...this.props} {...routeProps} />} />
                    <Route path="/" component={(routeProps) => <Chathub {...this.props} {...routeProps} />} />
                </Switch>
            </div>
        )
    }
}

export default Routes