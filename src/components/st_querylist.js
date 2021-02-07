import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../contextapi/authContext";
import { Accordion, Card, Button } from "react-bootstrap";

class st_querylist extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            st_query: [],
            ellaborate: [],
            show: false,
            error: ''
        };
        this.handleSubmit = this.handleClick.bind(this);
    }

    componentDidMount() {
        const token = this.context.uso[0].token;

        axios.get("http://localhost:8000/api/query/false", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(res);
            const st_query = res.data.data;
            this.setState({ st_query });
        }).catch((err) => {
            console.log(err.response)
            this.setState({
                show: true,
                error: err.response.data.msg
            })
        })

    }

    handleClick = (e) => {
        //console.log(res.data.data[0]._id);
        // axios.get()
        console.log(e);
        axios.get(`http://localhost:8000/api/query/${e}`).then((res) => {
            console.log(res);
            console.log(res.data.data[0]?.ellaborate);
            this.setState({ ellaborate: res.data.data[0]?.ellaborate });
        });
    };
    // handleClick2 =(e)=>{
    //     console.log(e);
    //     const ed = e._id
    //     const qu = e.query
    //     return(
    //         <Link style={{ textDecoration: "none", color: 'red' }} to ={{
    //             pathname:`/postanswer/${ed}`,
    //             aboutProps:{
    //                 query:`${qu}`
    //             }
    //         }}/>

    //     )
    //     //window.location.href =`/postanswer/${e._id}`
    // }
    render() {
        const ellaborate = this.state.ellaborate;
        return (
            <div className="container">

                <h1 className="text-center">{this.state.error}</h1>

                <h2>TECHRIDA SOLUTION</h2>



                <div className="container p-4">
                    {/* <ul className="list-group" >
                        {this.state.st_query.map(querylist =>
                            <li className="list-group-item"  >
                                {/* <Link to={`/postanswer/${querylist._id}`} style={{ textDecoration: "none", color: 'red' }} aboutProps={{user:"abc"}}>
                                    {querylist.query}
                                </Link> */}
                    {/* <Link style={{ textDecoration: "none", color: 'red' }} to ={{
                                    pathname:`/postanswer/${querylist._id}`,
                                    aboutProps:{
                                        query:`${querylist.query}`
                                    }
                                }}>
                                    {querylist.query}
                                </Link>
                                <button style={{ float: 'right' }} className="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">See More</button>

                            </li>)}
                    </ul> */}
                    <Accordion defaultActiveKey="0">
                        {this.state.st_query.map((querylist) => (
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
                                    <Button className="float-right btn btn-success">
                                        <Link
                                            style={{ textDecoration: "none", color: "white" }}
                                            to={{
                                                pathname: `/postanswer/${querylist._id}`,
                                                aboutProps: {
                                                    query: `${querylist.query}`,
                                                },
                                            }}
                                        >
                                            Answer
                    </Link>
                                    </Button>
                                </Card.Header>
                                <Accordion.Collapse eventKey={querylist._id}>
                                    <Card.Body>{ellaborate}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </div>
        );
    }
}
export default st_querylist;
