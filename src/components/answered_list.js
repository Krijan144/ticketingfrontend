import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class st_answeredlist extends Component{
    constructor(props){
        super(props);
        this.state ={
            ansd_query:[],
        };
        this.handleSubmit = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        axios.get('http://localhost:8000/api/query/true')
        .then(res =>
            {
                console.log(res);
                const ansd_query = res.data.data;
                this.setState({ansd_query})
            }
            )
    }
    handleClick(event) {
        console.log("Clicked");

    }
    render(){
        return(
            <div className="container">
            <h2>ANSWERED QUERY</h2>
            
            <div className="container p-4" onClick={this.handleClick}>
                <ul className="list-group" >
                    {this.state.ansd_query.map(ansdlist => <li className="list-group-item" > {ansdlist.query}</li>)}
                </ul>
            </div>
            </div>
        )
    }
}
export default st_answeredlist;