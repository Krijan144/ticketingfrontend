import React, { Component } from 'react';
import axios from 'axios';
import { AuthContext } from '../contextapi/authContext'
import { Link } from 'react-router-dom';

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
            <div className="container p-4" onClick={this.handleSubmit}>
                <ul className="list-group" style={{ textDecoration: 'none' }}>
                    {this.state.query.map(querylist => <li className="list-group-item">
                        <Link to={`/getanswer/${querylist._id}`} style={{ textDecoration: "none", color: '#333' }} >
                            {querylist.query}
                        </Link>
                    </li>)}

                </ul>
            </div>
        )
    }
}

export default querylist