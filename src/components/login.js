import React,{Component} from 'react';
import axios from 'axios'
import {AuthContext} from '../contextapi/authContext'
import { useAccordionToggle } from 'react-bootstrap';

// const { state: ContextState, login } = useContext(AuthContext);
// const {
//   isLoginPending,
//   isLoggedIn,
//   loginError
// } = ContextState;
// const [state, setState] = useSetState(initialState);

class login extends Component{
    static contextType=AuthContext
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }

     //   this.handleChange = this.handleChange.bind(this);
      //  this.handleSubmit = this.handleSubmit.bind(this);
    }
        handleSubmit = (event) =>{
            event.preventDefault();
            axios({
                url:"http://localhost:8000/users/login/",
                method:"POST",
                data:this.state,
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(
                
                response=>{
                    const { token,user } = response.data
                    localStorage.setItem("token", token)
                    localStorage.setItem("user", JSON.stringify(user));
                    console.log(response)
            }).catch(err=>{
                console.log(err)
            })

        }
        handleChange = (event) => {
            this.setState({[event.target.getAttribute("name")]:event.target.value});
        }

    render(){
        //console.log(this.context)
        return(
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:<br/>
                    <input type ="text" name="email" value={this.state.email} onChange={this.handleChange}/><br/>
                    Password:<br/>
                    <input type ="text" name="password" value={this.state.password} onChange={this.handleChange}/><br/>
                </label><br/>
                <input type="submit" value="LOGIN" className="btn-primary"/>
            </form>
            </div>
        )
    }
}
export default login