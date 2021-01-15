import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { Form, Button, Alert } from 'react-bootstrap'
import { AuthContext } from '../contextapi/authContext';
import { Redirect, useHistory } from 'react-router-dom';


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isAutheticated, setIsAutheticated] = useContext(AuthContext).auth;
    const [user, setUser] = useContext(AuthContext).uso;
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
            console.log(response)
            const { token, user } = response.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user));
            console.log(response)
            setIsAutheticated(true)
            setSubmitted(true)
            setShow(false)
            history.push('/queryform')
            window.location.reload();

        }).catch(err => {
            console.log(err.response.data.msg)
            setShow(true)
            setError(err.response.data.msg)
        })
    }


    useEffect(() => {
        if (localStorage.getItem('token') == user.token) {
            setIsAutheticated(true)
        }
    }, [])

    return (
        <div className="container p-5">
            <div className="col-lg-5 offset-md-4">
                {show ? <Alert variant='danger'>
                    {error}
                </Alert> : null}
                {submitted && <Alert variant='success'>Success! You are logged in.</Alert>}


                <h3 className="text-center my-5">LOGIN</h3>

                <Form onSubmit={handleSubmit}>
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

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>

                    <Button variant="primary" type="submit">Login</Button>

                </Form>
            </div>
        </div>
    )
}

export default Login

