import React,{Component} from 'react';
import {Navbar,NavDropdown,Form,FormControl,Nav,Button} from 'react-bootstrap';

class Nav2 extends Component{

    render(){return(
                <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">TECHRIDA STAFF</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/queryform">SubmitQuery</Nav.Link>
                <Nav.Link href="/querylist">QueryList</Nav.Link>
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
            </Navbar>

    )}
}

export default Nav2