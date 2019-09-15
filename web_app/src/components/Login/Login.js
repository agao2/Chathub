import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


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
      await this.props.authenticate({
        emailAddress: this.state.emailAddress,
        password: this.state.password
      })
      if (this.props.User) {
        this.props.history.push("/");
      }
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20%',
        }}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form style={{
            width: '100%', // Fix IE 11 issue.
            display: 'block'
          }}>
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
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onSubmit}
              style={{ margin: '2% 0 2% 0 ' }}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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

export default Login;