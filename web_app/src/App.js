import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { getUser, authenticate } from './actions/Users'
import Routes from './components/Routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'

class App extends Component {

  constructor(props) {
    super(props);
    console.log(this.props)
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Routes} />
          <Route exact path="/login" component={(routeProps) => <Login {...this.props} {...routeProps} />} />
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
    Users: state.Users
  }
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);