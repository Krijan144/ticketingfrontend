import React, { Component } from "react";
import axios from "axios";
import { AuthContext } from "../contextapi/authContext";
import { Accordion, Card, Button } from "react-bootstrap";

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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
            <div className="container p-3 my-4 mt-5">
                <Accordion defaultActiveKey="0" className="p-4">
                    <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "white", textAlign: "center" }} className="my-5">Following Queries are yet to be answered</h2>
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
            </div>
        );
    }
}

export default querylist;