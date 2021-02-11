import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    NavDropdown,
    Form,
    Nav,
} from "react-bootstrap";
import { AuthContext } from "../contextapi/authContext";

const Nav1 = () => {
    // const [isAutheticated, setIsAutheticated] = useContext(AuthContext).auth;\
    const [isLoggedin, setIsLoggedin] = useContext(AuthContext).login;
    const [isAdmin, setIsAdmin] = useContext(AuthContext).isAdmin;
    const handleOut = () => {
        localStorage.clear();
        // history.push("/login");
        setIsLoggedin(false);
    };

    return (
        <Navbar className="nav_main" expand="lg" style={{ background: '#13859e' }}>
            <div className="container">
                <Navbar.Brand as={Link} to="/" style={{ color: "white", fontWeight: "900" }}>
                    TECHRIDA
        </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {JSON.parse(localStorage.getItem("user"))?.role === 'admin' ?
                            <>
                                <Nav.Link as={Link} to="/st_button" className="mr-5">Answer Queries</Nav.Link>
                                {/* <Nav.Link as={Link} to="/queryform" className="mr-5">SubmitQuery</Nav.Link>
                                <Nav.Link as={Link} to="/button" className="mr-5">QueryList</Nav.Link> */}
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to="/" className="mr-5">Home</Nav.Link>
                                <Nav.Link as={Link} to="/queryform" className="mr-5">SubmitQuery</Nav.Link>
                                <Nav.Link as={Link} to="/button" className="mr-5">QueryList</Nav.Link>
                            </>
                        }
                        {isLoggedin ? (
                            <Nav.Link href="/" onClick={handleOut}>
                                Logout
                            </Nav.Link>
                        ) : (
                                <NavDropdown title="Account" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                                </NavDropdown>
                            )}
                    </Nav>
                    <Form inline></Form>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Nav1;
