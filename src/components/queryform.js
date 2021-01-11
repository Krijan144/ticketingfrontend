import React, { Component } from "react";
import axios from "axios";
import querylist from "./querylist";
import { AuthContext } from "../contextapi/authContext";
import { Form, Button } from 'react-bootstrap'


class Queryform extends Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state = {
      query1: [],
      formData: {
        ellaborate: "",
        query: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/query`)
      .then(res => {
        console.log(res);
        const query = res.data.data
        this.setState(
          { query1: query }
        )
      }
      )
  }

  handleChange(event) {

    this.setState((prev) => ({ formData: { ...prev.formData, [event.target.getAttribute("name")]: event.target.value } }));
    console.log(this.context.uso[0].token);


  }
  // handleChange(event){
  //   console.log("clicked")
  //   console.log(this.props.match.params.id)
  // }



  handleSubmit(event) {
    event.preventDefault();
    console.log(this.context.uso[0].user.id)
    const id = this.context.uso[0].user.id
    const token = this.context.uso[0].token
    console.log(this.state);
    axios({

      url: `http://localhost:8000/api/query/${id}`,
      method: "POST",
      data: this.state.formData,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      console.log(response)
    })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    console.log(this.context)
    //const {name} = this.context;
    //console.log(name)
    return (
      <div className="container p-5 col-5 offset-md-4">
        {/* <label>
            <select onChange={(event) => this.setState((prev) => ({formData: {...prev.formData, query: event.target.value}})) }>
                {this.state.query1.map(querylist => <option id={querylist.id}>{querylist.query}</option>)}
            </select>
            <br />
            <div className="container p-1">

            </div >
            </label>  */}
        {/* <form onSubmit={this.handleSubmit}>
          <label>

            Query:<br />
            <input type="text" name="query" value={this.state.formData.query} onChange={this.handleChange} /><br />
            Ellaborate:<br />
            <textarea value={this.state.formData.ellaborate} rows="5" cols="60" name="ellaborate" onChange={this.handleChange} />

            <br />
          </label>
          <br />
          <input type="submit" value="Submit" className="btn-primary" />
        </form> */}

        <Form>
          <h3>SUBMIT YOUR QUERIES</h3>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Query</Form.Label>
            <Form.Control as="select" value={this.state.formData.query} onChange={(event) => this.setState((prev) => ({ formData: { ...prev.formData, query: event.target.value } }))}>
              {this.state.query1.map(querylist =>
                <option id={querylist.id} value={querylist.value}>{querylist.query}</option>
              )
              }
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Query</Form.Label>
            <Form.Control type="text" name="query" value={this.state.formData.query} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ellaborate</Form.Label>
            <Form.Control as="textarea" rows={3} value={this.state.formData.ellaborate} rows="5" name="ellaborate" onChange={this.handleChange} />
          </Form.Group>
          <Button variant="primary">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Queryform;