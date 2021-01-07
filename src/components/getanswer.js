import React,{Component} from 'react';
import axios from 'axios';

class getanswer extends Component{
     constructor(props){ 
       super(props);
           this.state = {
            answers: [],
            
      };
    } 
    
      componentDidMount() {
        const { id } = this.props.match.params
        console.log(id);
        axios.get(`http://127.0.0.1:8000/answer/${id}`)
      .then(res => {
        console.log(res);
        this.setState({answers:res.data.answer});
        
      })
      }

    
      render() {
        const { answers } = this.state;
        console.log(answers)
        return (
          <ul className="listgroup">
            Answer:<li className="list-group-item">{answers.answer}</li><br/>
            Answered By:<li className="list-group-item">{answers.answered_by}</li><br/>
            Query_id: {answers.query}
              {/* {answers && answers.map(answer =>
                 <li>{answer.answered_by}</li>
                )}    
                
                */}
          </ul>
        )
      }
}

export default getanswer;