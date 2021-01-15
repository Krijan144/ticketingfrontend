import React, { Component } from 'react';
import axios from 'axios';
import { AuthContext } from "../contextapi/authContext"
import { useHistory, Link } from 'react-router-dom';
import { Navbar, NavDropdown, Form, FormControl, Nav, Button } from 'react-bootstrap';



class getanswer extends Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state = {
      answers: [],

    };

  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    const id = this.props.match.params.id
    axios.get(`http://localhost:8000/api/answer/${id}`)
      .then(res => {
        console.log(res);
        this.setState({ answers: res.data?.answer });

      })
  }


  render() {

    const { answers } = this.state;
    const query = this.props.location.aboutProps.query
    return (

      <div className="container mt-5">
      <b>Query:</b>{query}
        <br/>
        <ul className="listgroup">
          {!this.state.answers ?
            <h3>Yet to be answered</h3>
            :
            <div>Answer : <li className="list-group-item">{answers}</li><br /></div>


          }
          <Link to="/querylist" className="mr-5" style={{ color: 'white' }}>
            <button className="btn btn-secondary">
              Back
          </button>
          </Link>


          {/* {answers && answers.map(answer =>
                 <li>{answer.answered_by}</li>
                )}    <h1>hello</h1>
                
                */}


        </ul>

      </div>
    )
  }
}

export default getanswer;