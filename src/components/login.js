import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { AuthContext } from '../contextapi/authContext';


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAutheticated, setIsAutheticated] = useContext(AuthContext);


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
            localStorage.setItem('token', response.data.token)
            setIsAutheticated(true)
        }).catch(err => {
            console.log(err)
        })

    }


    return (
        <div className="container p-5">
            <div className="col-5 offset-md-4">
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
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">Login</Button>

                </Form>
            </div>
        </div>
    )
}

export default Login
