import React,{Component} from "react";
import axios from "axios";
import querylist from "./querylist";

class postanswer extends Component{
    constructor(props){
        super(props);
        this.state={
            answered_by:"",
            answer:"",
            query:this.props.match.params.id
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

        axios({
            url:"http://127.0.0.1:8000/post_answer/",
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
                    Answered_by:
                    <input type="text" name="answered_by" value={this.state.answered_by} onChange={this.handleChange}/>
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