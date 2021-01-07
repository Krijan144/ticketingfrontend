import React,{Component} from 'react';
import axios from 'axios';
import {} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class querylist extends Component{
    constructor(props){
        super(props);
        this.state ={
            query:[],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/getquery`)
        .then(res=>
            {
                console.log(res);
                const query = res.data
                this.setState(
                    {query}
                )
            }
            )
    }
    handleSubmit(event){
        console.log("clicked");
    }
    // handleClick(id){
    //     console.log(id);
    //     <Link to={
    //         "/getanswer/:id"
    //     }
    //     />
    // }
    render(){
        return(
            <div className="container p-4" onClick={this.handleSubmit}>
            <ul className="list-group" style={{textDecoration: 'none'}}>
                {this.state.query.map(querylist => <li className="list-group-item"><Link to={`/getanswer/${querylist.id}`} style={{textDecoration: "none"}} >{querylist.query}</Link></li>)}

            </ul>
            </div>
        )
    }
}

export default querylist