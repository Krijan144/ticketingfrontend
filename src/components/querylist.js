import React, { Component } from 'react';
import axios from 'axios';
import { } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contextapi/authContext';
import { ListGroup } from 'react-bootstrap';

class querylist extends Component {
    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            query: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        console.log(this.context.uso[0].user.id)
        const id = this.context.uso[0].user.id
        const token = this.context.uso[0].token
        axios.get(`http://localhost:8000/api/query/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                const query = res.data.data
                this.setState(
                    { query }
                )
            }
            )
    }
    handleSubmit(event) {
        console.log("clicked");
    }

    render() {
        return (
            <ListGroup className="container p-4" onClick={this.handleSubmit}>
                <h5><b>Following Queries are yet to be answered</b></h5><br/>
                
                {this.state.query.map(querylist => 
                <Link to={`/getanswer/${querylist._id}`} style={{ textDecoration: "none", color: "#333"}} >
                    <ListGroup.Item className="mb-2">
                    {querylist.query}
                    </ListGroup.Item>
                </Link>)}
                <br/>
            </ListGroup>
        )
    }
}

export default querylist