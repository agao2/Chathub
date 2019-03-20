import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import './Navibar.css'


class Navibar extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    onLogin = () => {
        this.props.history.push("/login");
    }

    render() {
        const isLoggedIn = this.props.User ? true : false;
        console.log(this.props)
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand >Chathub</Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {isLoggedIn
                    ? <Navbar.Text>
                        Signed in as: <a>{this.props.User.username}</a>
                    </Navbar.Text>
                    : <Button onClick={this.onLogin}> Login </Button>
                }
            </Navbar>
        );
    }
}


export default Navibar;
