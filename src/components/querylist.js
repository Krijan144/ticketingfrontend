import React,{Component} from 'react';
import axios from 'axios';
import {} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {AuthContext} from '../contextapi/authContext'

class querylist extends Component{
    static contextType = AuthContext
    constructor(props){
        super(props);
        this.state ={
            query:[],
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount(){
        console.log(this.context.user.user.id);
        console.log(this.context.user.token);
        const id = this.context.user.user.id
        const token = this.context.user.token
        axios({
            url:`http://localhost:8000/api/query/${id}`,
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res=>
            {
                console.log(res);
                const query = res.data.data
                this.setState(
                    {query}
                )
            }
            )
    }
    // handleSubmit(event){
    //     console.log("clicked");

    // }
    // handleClick(id){
    //     console.log(id);
    //     <Link to={
    //         "/getanswer/:id"
    //     }
    //     />
    // }
    
    render(){
        console.log(this.state.query, "ok")
        return(
            <div className="container p-4" onClick={this.handleSubmit}>
            <ul className="list-group" style={{textDecoration: 'none'}}>
                {this.state.query.map(querylist => <li className="list-group-item"><Link to={`/getanswer/${querylist._id}`} style={{textDecoration: "none"}} >{querylist.query}</Link></li>)}

            </ul>
            </div>
        )
    }
}

export default querylist