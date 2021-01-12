import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contextapi/authContext'
import {Tab,Col,Row,Nav,Accordion,Card,Button} from 'react-bootstrap'

class ans_query extends Component {
    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            query: [],
            answers:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        console.log(this.context.uso[0].user.id)
        const id = this.context.uso[0].user.id
        const token = this.context.uso[0].token
        axios.get(`http://localhost:8000/api/query/truequery/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data);
                const query = res.data.data
                this.setState(
                    { query }
                )
            }
            )
    }
    handleClick = (e) =>{
        //console.log(res.data.data[0]._id);
       // axios.get()
        console.log(e)
       axios.get(`http://localhost:8000/api/answer/${e}`)
       .then(res => {
         console.log(res);
         this.setState({ answers: res.data.answer });
 
       })
    }
    handleSubmit(event) {
        console.log("clicked");
    }

    render() {
        const answers= this.state.answers
        console.log(this.data)
        return (
            <div className="container p-3 my-4">
                <h5><b>Your Answers</b></h5><br/>
                        <Accordion defaultActiveKey="0">
                        {this.state.query.map(querylist => 
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} onClick={()=>this.handleClick(querylist._id)} variant="link" color="green" eventKey={querylist._id}>
                                {querylist.query}
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={querylist._id}>
                            <Card.Body>{answers}</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        )}
                        </Accordion>
                </div>
        )
    }
}

export default ans_query