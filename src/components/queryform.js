import React, { Component } from "react";
import axios from "axios";
import { AuthContext } from "../contextapi/authContext";
import { Form, Button, Alert } from "react-bootstrap";
import "./css/askQuery.css";

class Queryform extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      q_role: [],
      formData: {
        query: "",
        ellaborate: "",

        q_type: "",
      },
      submitted: false,
    };

    //this.handleChange = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.context.uso[0]?.user.id;
    axios.get(`http://localhost:8000/api/query/q_role`).then((res) => {
      console.log(res);
      console.log(res.data);
      const role = res.data;
      console.log(role);
      this.setState({ q_role: role });
    });
  }

  handleChange(event) {
    this.setState((prev) => ({
      formData: {
        ...prev.formData,
        [event.target.getAttribute("name")]: event.target.value,
      },
    }));
    console.log(this.context.uso[0].user);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.context.uso[0].user.id);
    const id = this.context.uso[0]?.user.id;
    const token = this.context.uso[0].token;
    console.log(this.state);
    axios({
      url: `http://localhost:8000/api/query/${id}`,
      method: "POST",
      data: this.state.formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        this.setState({
          submitted: true,
        });
        // this.setState((p) => ({
        //   formData: { ...p.formData, query: "", ellaborate: "" },
        // }));
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    //const {name} = this.context;
    //console.log(name)

    return (
      <div className="container p-5 col-lg-5 col-md-5 offset-md-4 askQuery mt-5">
        <Form onSubmit={this.handleSubmit}>
          {this.state.submitted && (
            <Alert variant="success">
              Success! Your problem will be noticed fast.
            </Alert>
          )}
          <h3 className="my-3 text-center">SUBMIT YOUR QUERIES</h3>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Type</Form.Label>
            <Form.Control
              as="select"
              value={this.state.formData.q_type}
              name="q_type"
              onChange={this.handleChange}
            >
              {/* <option selected>Open this select type</option> */}
              {this.state.q_role.map((list) => {
                return <option id={list.id}>{list.role}</option>;
              })}
              {/* <option></option> */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Query</Form.Label>
            <Form.Control
              type="text"
              name="query"
              value={this.state.formData.query}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ellaborate</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={this.state.formData.ellaborate}
              rows="5"
              name="ellaborate"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Queryform;
