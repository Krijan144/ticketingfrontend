import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { Form, Button, Alert, Modal } from 'react-bootstrap'
import { AuthContext } from '../contextapi/authContext';
import { useHistory, Link } from 'react-router-dom';
import './css/login.css'


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isLoggedin, setIsLoggedin] = useContext(AuthContext).login;
    // const [isAdmin, setIsAdmin] = useContext(AuthContext).isAdmin;


    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios({
            url: "http://localhost:8000/users/login/",
            method: "POST",
            data: { email, password },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response, "response from login")
            const { token, user } = response.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user));
            // setUser({
            //     token: localStorage.getItem("token"),
            //     user: JSON.parse(localStorage.getItem("user"))
            // })
            // setIsAdmin(user.user?.role === 'admin')
            setIsLoggedin(true)
            setSubmitted(true)
            setShow(false)
            if (JSON.parse(localStorage.getItem("user"))?.role === 'admin') {
                history.push('/st_button')
                console.log("is admin true");

            }
            else {
                history.push('/')
                console.log("is admin false");

            }
            // window.location.reload();

        }).catch(err => {
            console.log(err.response?.data.msg)
            setShow(true)
            setError(err.response.data.msg)
        })
    }


    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

            <div className="container " >
                <div className="container col-lg-5 offset-md-4 login z-depth-5">
                    {show ? <Alert variant='danger'>
                        {error}
                    </Alert> : null}
                    {submitted && <Alert variant='success'>Success! You are logged in.</Alert>}

                    <h3 className="text-center my-5">LOGIN</h3>

                    <Form onSubmit={handleSubmit} >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                         </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>

                        {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group> */}

                        <Link to="/register" style={{ fontSize: "12px" }}>Don't have an account ? Register</Link> <br /> <br />

                        <Button variant="primary" type="submit">Login</Button>


                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login

