import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            email: "",
            password: "",
            passwordCheck: ""
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
            console.log(response)
        }).catch(err => {
            console.log(err)
        })

    }
    handleChange(event) {
        this.setState({ [event.target.getAttribute("name")]: event.target.value });
    }

    //email, password, passwordCheck, fullname 

    render() {
        return (
            <div className="container">
                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:<br />
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><br />
                    Username:<br />
                        <input type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange} /><br />

                    Password:<br />
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} /><br />
                    Confirm Password:<br />
                        <input type="text" name="passwordCheck" value={this.state.passwordCheck} onChange={this.handleChange} /><br />
                    </label><br />
                    <input type="submit" value="REGISTER" className="btn-primary" />
                </form> */}

                <div className="col-5 offset-md-4">
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
export default register