import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, NavDropdown, Form, FormControl, Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../contextapi/authContext';
import { Redirect, useHistory } from 'react-router-dom';


const Nav1 = () => {

    // const [isAutheticated, setIsAutheticated] = useContext(AuthContext).auth;\
    const [isLoggedin, setIsLoggedin] = useContext(AuthContext).login;

    let history = useHistory();


    const handleOut = () => {
        localStorage.clear();
        history.push("/login");
        setIsLoggedin(false)
    }


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <div className="container">
                <Navbar.Brand as={Link} to="/">TECHRIDA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" className="mr-5">Home</Nav.Link>
                        <Nav.Link as={Link} to="/queryform" className="mr-5">SubmitQuery</Nav.Link>
                        {/* <Link to="/queryform">SubmitQuery</Link> */}
                        <Nav.Link as={Link} to="/querylist" className="mr-5">QueryList</Nav.Link>

                        {isLoggedin ?
                            <Nav.Link href="/" onClick={handleOut}>Logout</Nav.Link>
                            :
                            <NavDropdown title="Account" id="basic-nav-dropdown" >
                                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                            </NavDropdown>
                        }

                    </Nav>
                    <Form inline>

                    </Form>
                </Navbar.Collapse>
            </div>
        </Navbar >

    )

}

export default Nav1