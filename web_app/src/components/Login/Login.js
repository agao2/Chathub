import React, { Component } from 'react';
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { authenticate } from '../../redux/user/UsersActions'
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      password: ""
    }
  }
  onChange = (event) => {
    let state = this.state;
    state[event.target.id] = event.target.value;
  }

  onSubmit = async (event) => {
    // this triggers form validation
    if (event.currentTarget.form.reportValidity()) {
      let result = await this.props.authenticate(this.state)
      if (result.type === "LOGIN")
        this.props.history.push('/')
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div className={this.props.classes.paper} >
          <Avatar className={this.props.classes.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={this.props.classes.form} >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="emailAddress"
              label="Email Address"
              name="emailAddress"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              id="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onSubmit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
              </Link> */}
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (user) => dispatch(authenticate(user)),
  }
}

function mapStateToProps(state) {
  return {
    Chatrooms: state.User
  }
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'block',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));