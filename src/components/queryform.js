import React, { Component } from "react";
import axios from "axios";
import querylist from "./querylist";

class queryform extends Component {
    constructor(props){
        super(props);
        this.state ={
          query1:[],
          formData: {
            ellaborate: "",
            query: ""
          },
      };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
      
     console.log(this.props.params.id)
  }

    handleChange(event){
      
        this.setState((prev) => ({formData: {...prev.formData, [event.target.getAttribute("name")]: event.target.value}}));
        console.log(this.state);

    }
    // handleChange(event){
    //   console.log("clicked")
    //   console.log(this.props.match.params.id)
    // }
  //   componentDidMount(){
  //     axios.get(`http://127.0.0.1:8000/getquery`)
  //     .then(res=>
  //         {
  //             console.log(res);
  //             const query1 = res.data
  //             this.setState(
  //                 {query1}
  //             )
  //         }
  //         )
  // }
    handleSubmit(event){
        event.preventDefault();
        
        console.log(this.state);
        axios({
            url:"http://localhost:8000/api/query/",
            method:"POST",
            data:this.state.formData,
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>{
                console.log(response)
            })
            .catch(err=>{   
                console.log(err);
            })
        }
        
  render() {
    return (
      <div className="container">
        <h2>Submit Your Query</h2>
        {/* <label>
            <select onChange={(event) => this.setState((prev) => ({formData: {...prev.formData, query: event.target.value}})) }>
                {this.state.query1.map(querylist => <option id={querylist.id}>{querylist.query}</option>)}
            </select>
            <br />
            <div className="container p-1">

            </div >
            </label>  */}
        <form onSubmit={this.handleSubmit}>
          <label>
           
            Query:<br />
            <input type="text" name="query" value={this.state.formData.query} onChange={this.handleChange} /><br />
            Ellaborate:<br />
            <textarea value={this.state.formData.ellaborate} rows = "5" cols = "60" name = "ellaborate" onChange={this.handleChange}/>
            
         <br/>
          </label>
          <br />
          <input type="submit" value="Submit" className="btn-primary"/>
        </form>
      </div>
    );
  }
}

export default queryform;