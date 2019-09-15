import React, { Component } from 'react';
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


class SignUp extends Component {

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
                    <Avatar >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
            </Typography>
                    <form style={{
                        width: '100%', // Fix IE 11 issue.
                        display: 'block',
                        margin: '5% 0 5% 0 '
                    }} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="Username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.onSubmit}
                            style={{ margin: '2% 0 2% 0 ' }}
                        >
                            Sign Up
              </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                  </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default SignUp;