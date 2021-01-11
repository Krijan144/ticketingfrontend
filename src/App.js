import React,{Component} from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import queryform from './components/queryform'
import postanswer from './components/post_answer'
import getanswer from './components/getanswer'
import login from './components/login'
import Nav1 from './components/header'
import home from './components/main'
import querylist from './components/querylist'
import st_querylist from './components/st_querylist'
import st_answeredlist from './components/answered_list'
import dropdown from './components/dropdown'
import register from './components/register'
import Nav2 from './components/header2'

import {AuthProvider} from "./contextapi/authContext";

class App extends Component{
  render(){
    return(
      <AuthProvider>
        <BrowserRouter>
        
          <Nav1 />
           <Route path='/queryform' exact component={queryform} />
           <Route path='/postanswer/:id' exact component={postanswer} />
           <Route path='/getanswer/:id' exact component={getanswer} />
           <Route path='/login' exact component={login} />
           <Route path='/' exact component={home} />
           <Route path='/querylist/' exact component={querylist} />
           <Route path='/st_querylist/' exact component={st_querylist} />
           <Route path='/st_answeredlist/' exact component={st_answeredlist} />
           <Route path='/dropdown' exact component={dropdown} />
           <Route path='/register' exact component={register} />
         
         
          
           {/* <Switch>
             <Redirect from='/querylist/:id' to='/getanswer/:id'/>
             <Route path='/getanswer/:id'/>
           </Switch> */}

        </BrowserRouter>
      </AuthProvider>
      // <h1>hi</h1>
    
    );
  }

}

export default App;