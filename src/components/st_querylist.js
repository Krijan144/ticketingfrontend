import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class st_querylist extends Component{
    constructor(props){
        super(props);
        this.state ={
            st_query:[],
        };
        this.handleSubmit = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/getquery')
        .then(res =>
            {
                console.log(res);
                const st_query = res.data;
                this.setState({st_query})
            }
            )
    }
    handleClick(event) {
        console.log("Clicked");

    }
    render(){
        return(
            <div className="container">
            <h2>TECHRIDA SOLUTION</h2>
            
            <div className="container p-4" onClick={this.handleClick}>
                <ul className="list-group" >
                    {this.state.st_query.map(querylist => <li className="list-group-item" ><Link to ={`/postanswer/${querylist.id}`} style={{textDecoration: "none"}}>{querylist.query} </Link> </li>)}
                </ul>
            </div>
            </div>
        )
    }
}
export default st_querylist;