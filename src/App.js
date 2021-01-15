import React, { useState } from 'react'
import Routes from './routes'
import { AuthProvider } from './contextapi/authContext';
// import { Accordion, Card, Button } from 'react-bootstrap'

const App = () => {
  // const [use, setUse] = useState([
  //   { id: 1, title: 'sagun', desc: 'hello' },
  //   { id: 2, title: 'shrestha', desc: 'hello ............' },
  // ])

  return (
    <AuthProvider>
      <Routes />


      {/* 
      <Accordion defaultActiveKey="">
        {use.map(item => {
          return (

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={item.id}>
                  {item.title}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={item.id}>
                <Card.Body>{item.desc}</Card.Body>
              </Accordion.Collapse>
            </Card>

          )
        })}
      </Accordion> */}







    </AuthProvider >

  );


}

export default App;

