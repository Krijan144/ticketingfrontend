import React, { Component } from 'react';
import axios from 'axios';
import { AuthContext } from "../contextapi/authContext"

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
        this.setState({ answers: res.data.answer });

      })
  }


  render() {
    const { answers } = this.state;
    return (
      <ul className="listgroup">
        Answer:<li className="list-group-item">{answers}</li><br />


        {/* {answers && answers.map(answer =>
                 <li>{answer.answered_by}</li>
                )}    
                
                */}
      </ul>
    )
  }
}

export default getanswer;