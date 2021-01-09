import React,{Component} from 'react';
import axios from 'axios'

class register extends Component{
    constructor(props){
        super(props);
        this.state = {
            fullname:"",
            email:"",
            password: "",
            passwordCheck:"",
            role:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
        handleSubmit(event){
            event.preventDefault();
            axios({
                url:"http://localhost:8000/users/register",
                method:"POST",
                data:this.state,
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(response=>{
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })

        }
        handleChange(event){
            this.setState({[event.target.getAttribute("name")]:event.target.value});
        }

        //email, password, passwordCheck, fullname 

    render(){
        return(
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <label>
                     Email:<br/>
                    <input type ="text" name="email" value={this.state.email} onChange={this.handleChange}/><br/>
                    Username:<br/>
                    <input type ="text" name="fullname" value={this.state.fullname} onChange={this.handleChange}/><br/>
                    
                    Password:<br/>
                    <input type ="password" name="password" value={this.state.password} onChange={this.handleChange}/><br/>
                    Confirm Password:<br/>
                    <input type ="password" name="passwordCheck" value={this.state.passwordCheck} onChange={this.handleChange}/><br/>
                    Role:<br/>
                    <input type ="text" name="role" value={this.state.role} onChange={this.handleChange}/><br/>
                </label><br/>
                <input type="submit" value="REGISTER" className="btn-primary"/>
            </form>
            </div>
        )
    }
}
export default register