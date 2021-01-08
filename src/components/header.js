import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Nav, Button } from 'react-bootstrap';

class Nav1 extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <div className="container">
                    <Navbar.Brand href="#home">TECHRIDA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/queryform" className="mx-5">SubmitQuery</Nav.Link>
                            <Nav.Link href="/querylist" className="mr-5">QueryList</Nav.Link>
                            <NavDropdown title="Account" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>

                        </Form>
                    </Navbar.Collapse>
                </div>
            </Navbar>

        )
    }
}

export default Nav1