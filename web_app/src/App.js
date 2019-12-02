import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { getUser, authenticate } from './redux/user/UsersActions'
import Routes from './components/Routes'
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={(routeProps) => <Login {...this.props} {...routeProps} />} />
          <Route exact path="/signup" component={(routeProps) => <SignUp {...this.props} {...routeProps} />} />
          <Route path="/" component={ (routeProps) =>  <Routes {...this.props} {...routeProps} />} />
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
    authenticate: (user) => dispatch(authenticate(user))
  }
}

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));