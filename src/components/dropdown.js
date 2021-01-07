import React,{Component} from 'react';
import axios from 'axios';
import {} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class dropdown extends Component{
    constructor(props){
        super(props);
        this.state ={
            query:[],
        };
      //  this.state={
            
      //  },
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
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
    handleChange(event){
        console.log("clicked");
       console.log(this.props.match.params.id)
    }
    handleSubmit1(event){
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
        <div className="container p-3">
            <label>
            <select onClick={this.handleChange} >
                {this.state.query.map(querylist => <option >{querylist.query}</option>)}
            </select>
            <br />
            <div className="container p-1">
            <input type="submit" value="Submit" className="btn-primary" onClick={this.handleSubmit1} />
            </div >
            </label> 
            </div>
        )
    }
}

export default dropdown