import React, { Component } from "react";
import axios from "axios";
import {} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contextapi/authContext";
import { ListGroup } from "react-bootstrap";
import { Tab, Col, Row, Nav, Accordion, Card, Button } from "react-bootstrap";

class querylist extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      query: [],
      ellaborate: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log(this.context.uso[0].user.id);
    const id = this.context.uso[0].user.id;
    const token = this.context.uso[0].token;
    axios
      .get(`http://localhost:8000/api/query/falsequery/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((res) => {
        console.log(res.data.data);
        const query = res.data.data;
        this.setState({ query });
      });
  }
  handleClick = (e) => {
    console.log(e);
    axios.get(`http://localhost:8000/api/query/${e}`).then((res) => {
      console.log(res);
      console.log(res.data.data[0]?.ellaborate);
      this.setState({ ellaborate: res.data.data[0]?.ellaborate });
    });
  };

  render() {
    const ellaborate = this.state.ellaborate;
    return (
      //   <ListGroup className="container p-4" onClick={this.handleSubmit}>
      //     <h5>
      //       <b>Following Queries are yet to be answered</b>
      //     </h5>
      //     <br />

      //     {this.state.query.map((querylist) => (
      //       //<Link
      //       //to={`/getanswer/${querylist._id}`}
      //       //style={{ textDecoration: "none", color: "#333" }}
      //       //>
      //       <ListGroup.Item
      //         onClick={() => this.handleClick(querylist._id)}
      //         eventKey={querylist._id}
      //         className="mb-2"
      //       >
      //         {querylist.query}
      //       </ListGroup.Item>
      //       //</Link>
      //     ))}
      //     <br />
      //   </ListGroup>
      <Accordion defaultActiveKey="0" className="p-4">
        <h2>Following Queries are yet to be answered</h2>
        <br />
        {this.state.query.map((querylist) => (
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                onClick={() => this.handleClick(querylist._id)}
                variant="link"
                color="green"
                eventKey={querylist._id}
                className="text-decoration-none "
              >
                {querylist.query}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={querylist._id}>
              <Card.Body>Ellaborate::{ellaborate}</Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    );
  }
}

export default querylist;
