import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class st_querylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            st_query: [],
        };
        this.handleSubmit = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/query/')
            .then(res => {
                console.log(res);
                const st_query = res.data.data;
                this.setState({ st_query })
            }
            )
    }
    handleClick(event) {
        console.log("Clicked");

    }
    render() {
        return (
            <div className="container">
                <h2>TECHRIDA SOLUTION</h2>

                <div className="container p-4" onClick={this.handleClick}>
                    <ul className="list-group" >
                        {this.state.st_query.map(querylist =>
                            <li className="list-group-item" >
                                <Link to={`/postanswer/${querylist._id}`} style={{ textDecoration: "none", color: 'red' }}>
                                    {querylist.query}
                                </Link>
                                <button style={{ float: 'right' }} className="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">See More</button>
                                <div class="collapse" id="collapseExample">
                                    <div class="card card-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
                                </div>
                            </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
export default st_querylist;