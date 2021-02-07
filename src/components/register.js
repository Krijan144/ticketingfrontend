import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './css/register.css'

class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            email: "",
            password: "",
            passwordCheck: "",
            role: "customer",
            show: false,
            error: "",
            submitted: false

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios({
            url: "http://localhost:8000/users/register",
            method: "POST",
            data: this.state,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            this.setState({
                fullname: "",
                email: "",
                password: "",
                passwordCheck: "",
                role: "",
                submitted: true,
                show: false
            });
            console.log(response)
        }).catch(err => {
            console.log(err.response.data.msg)
            this.setState({
                show: true,
                error: err.response.data.msg
            })
        })

    }
    handleChange(event) {
        this.setState({ [event.target.getAttribute("name")]: event.target.value });
        console.log(this.state.role);

    }

    render() {
        return (
            <div className="container">

                <div className="col-lg-5 col-md-5  offset-md-4 my-5 register">

                    {this.state.show ? <Alert variant='danger'>
                        {this.state.error}
                    </Alert> : null}
                    {this.state.submitted && <Alert variant='success'>Success! You are successfully registered.</Alert>}
                    <h3 className="text-center my-5">SIGN UP</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                         </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="username" name="fullname" value={this.state.fullname} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Re-type Password" name="passwordCheck" value={this.state.passwordCheck} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" value={this.state.value} onChange={(e) => { this.setState({ role: e.target.value }) }}>
                                <option value="customer">customer</option>
                                <option value="admin">admin</option>
                            </Form.Control>
                        </Form.Group>
                        <Link to="/login" style={{ fontSize: "12px" }}>Already have an account ? Login</Link> <br /> <br />

                        <Button variant="primary" type="submit">Register</Button>

                    </Form>
                </div>
            </div>
        )
    }
}
export default register