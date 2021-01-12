import React,{Component} from "react";
import axios from "axios";
import querylist from "./querylist";
import {AuthContext} from "../contextapi/authContext"
import {Button} from "react-bootstrap"

class postanswer extends Component{
    static contextType = AuthContext
    constructor(props){
        super(props);
        this.state={
            answer:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   // componentWillReceiveProps(){
     //   this.setState({query:this.props.match.params.id});
   // }
    handleChange(event){
        this.setState({[event.target.getAttribute("name")]:event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.props);
        const id = this.props.match.params.id;

        axios({
           
            url:`http://localhost:8000/api/answer/${id}`,
            method:"POST",
            data:this.state,
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>{
            console.log(response)
            if(window.confirm("Your Answer to the query has been Submitted!")){
            window.location.href ="/st_button";
            }
        })
        .catch(err=>{
            console.log(err)
        })

    }
    render(){
        console.log(this.props.match.params.id)
        console.log(this.props.location.aboutProps.user)
        const query=this.props.location.aboutProps.query;
        // const queryID = this.props.match.params.id;
        return(
            <div className="container">
                <div className="container my-4">
                    <h2>Answering Form</h2>
                    Query:<br/>
                    <b>{query}</b>
                    <form onSubmit={this.handleSubmit} className="mt-3">
                        <label>
                            Answer:<br/>
                            <textarea type="text" rows="4" cols="50" name="answer" value={this.state.answer} onChange={this.handleChange}/>
                            <br />
                            {/* Userid: */}
                            {/* <input type="text" name="query" value={queryID} onChange={this.handleChange} /> */}
                            <Button variant="success" type="Submit">Submit</Button>
                        </label>
                    </form>
                </div>
            </div>
        )
    }
} 
export default postanswer