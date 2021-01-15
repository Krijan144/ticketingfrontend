import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, NavDropdown, Form, FormControl, Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../contextapi/authContext';

const Nav1 = () => {

    const [isAutheticated, setIsAutheticated] = useContext(AuthContext).auth;


    const handleOut = () => {
        localStorage.clear();
        setIsAutheticated(false)
    }


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <div className="container">
                <Navbar.Brand href="#home">TECHRIDA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link  href="/queryform" className="mx-5">SubmitQuery</Nav.Link>
                        {/* <Link to="/queryform">SubmitQuery</Link> */}
                        <Nav.Link as={Link} to="/querybutton" className="mr-5">QueryList</Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown" >
                            {isAutheticated ?
                                <NavDropdown.Item href="/" onClick={handleOut}>Logout</NavDropdown.Item>
                                :
                                <div>
                                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                                </div>
                            }
                        </NavDropdown>
                    </Nav>
                    <Form inline>

                    </Form>
                </Navbar.Collapse>
            </div>
        </Navbar >

    )

}

export default Nav1