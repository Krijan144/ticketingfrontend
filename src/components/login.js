import React, { Component } from 'react';
import axios from 'axios'
import AuthContext from '../contextapi/authContext'
import { Form, Button } from 'react-bootstrap'


class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        axios({
            url: "http://localhost:8000/users/login/",
            method: "POST",
            data: this.state,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })

    }
    handleChange(event) {
        this.setState({ [event.target.getAttribute("name")]: event.target.value });
    }



    render() {
        return (
            <div className="container p-5">

                <div className="col-5 offset-md-4">
                    <h3 className="text-center my-5">LOGIN</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                         </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
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
}
export default login