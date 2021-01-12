import React,{Component} from 'react';
import {Button} from 'react-bootstrap';

const button = () =>{
    const handleButton1=()=>{
        window.location.href="/ans_query"
    }
    const handleButton2=()=>{
        window.location.href="/querylist"
    }
    return(
        <div className="container p-5">
            <div className="text-center my-3">
                    <h2>Your Query</h2>
            </div>
            <div className="text-center my-5">
                <Button variant="success" onClick={handleButton1}>Answered Query</Button>{'  '}
                <Button variant="danger" onClick={handleButton2}>To be answered</Button>
            </div>    
        </div>
    )
}

export default button;