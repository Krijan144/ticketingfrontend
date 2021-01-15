import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contextapi/authContext'


class st_querylist extends Component {
    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            st_query: [],
            show: false,
            error: ''
        };
        this.handleSubmit = this.handleClick.bind(this);
    }

    componentDidMount() {
        const id = this.context.uso[0].user.id
        const token = this.context.uso[0].token
        axios.get('http://localhost:8000/api/query/',
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
                const st_query = res.data.data;
                console.log(st_query, "sdfnldk");
                this.setState({ st_query: st_query })
            }).catch(err => {
                console.log(err.response.data.msg)
                this.setState({
                    show: true,
                    error: err.response.data.msg
                })
            })
    }

    handleClick(event) {
        console.log("Clicked");
    }

    render() {
        return (
            <div className="container">
                <h2>TECHRIDA SOLUTION</h2>

                <div className="container p-4" onClick={this.handleClick}>
                    <h3>{this.state.error}</h3>
                    <ul className="list-group" >
                        {this.state.st_query.map(querylist =>
                            <li className="list-group-item" >
                                <Link to={`/postanswer/${querylist._id}`} style={{ textDecoration: "none", color: 'red' }}>
                                    {querylist.query}
                                </Link>
                                <button style={{ float: 'right' }} className="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">See More</button>

                            </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
export default st_querylist;