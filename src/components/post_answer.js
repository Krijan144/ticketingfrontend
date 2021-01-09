import React,{Component} from "react";
import axios from "axios";
import querylist from "./querylist";
import {AuthContext} from "../contextapi/authContext"

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
        })
        .catch(err=>{
            console.log(err)
        })

    }
    render(){
        console.log(this.props.match.params.id)
        // const queryID = this.props.match.params.id;
        return(
            <div className="container">
                <h2>Answering Form</h2>
                <form onSubmit={this.handleSubmit}>
                <label>
                    
                    Answer:
                    <input type="text" name="answer" value={this.state.answer} onChange={this.handleChange}/>
                    {/* Userid: */}
                    {/* <input type="text" name="query" value={queryID} onChange={this.handleChange} /> */}
                    <input type="submit" value="Submit" className="btn-primary"/>
                </label>
                </form>
            </div>
        )
    }
} 
export default postanswer