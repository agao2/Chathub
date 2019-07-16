import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { getUser, authenticate } from './actions/UsersActions'
import Routes from './components/Routes'
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './components/Login'

class App extends Component {


  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={(routeProps) => <Login {...this.props} {...routeProps} />} />
          <Route path="/" component={ (routeProps) =>  <Routes {...this.props} {...routeProps} />} />
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser),
    authenticate: (user) => dispatch(authenticate(user))
  }
}

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

// export default App;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));