import React, { Component } from "react";
import axios from "axios";
import { AuthContext } from "../contextapi/authContext";
import { Form, Button, Alert } from "react-bootstrap";
import './css/askQuery.css'

class Queryform extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      query1: [],
      formData: {
        ellaborate: "",
        query: "",
        show: false,
        error: ''
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.context.uso[0].id;
    axios.get(`http://localhost:8000/api/query/user/${id}`).then((res) => {
      const query = res.data.data;
      this.setState({ query1: query });
    });
  }

  handleChange(event) {
    this.setState((prev) => ({
      formData: {
        ...prev.formData,
        [event.target.getAttribute("name")]: event.target.value,
      },
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.context.uso[0].id);
    const id = this.context.uso[0]?.id;
    const token = this.context.token[0];
    console.log(token);
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
        this.setState((prev) => ({
          formData: { ...prev.formData, query: "", ellaborate: "" },
        }));
        console.log(response);
      })
      .catch((err) => {
        this.setState({
          show: true,
          error: err.response.data.msg
        })
        console.log(err.response, "hello error");
      });
  }

  render() {
    //const {name} = this.context;
    //console.log(name)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-center">{this.state.error}</h1>

        <div className="container col-lg-6 col-md-6 offset-md-3 askQuery">
          <Form onSubmit={this.handleSubmit} >
            {this.state.submitted && (
              <Alert variant="success">
                Success! Your problem will be noticed fast.
              </Alert>
            )}
            <h3 className="my-3 text-center">SUBMIT YOUR QUERIES</h3>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Query</Form.Label>
              <Form.Control
                as="select"
                value={this.state.formData.query}
                onChange={(event) =>
                  this.setState((prev) => ({
                    formData: { ...prev.formData, query: event.target.value },
                  }))
                }
              >
                {this.state.query1.map((querylist) => {
                  return (
                    <option id={querylist.id} value={querylist.value}>
                      {querylist.query}
                    </option>
                  );
                })}
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
            <Button type="submit">
              Submit
          </Button>
          </Form>
        </div >
      </div >
    );
  }
}

export default Queryform;
