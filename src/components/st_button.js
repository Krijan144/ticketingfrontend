import React from 'react';
import { Button } from 'react-bootstrap';

const st_button = () => {
    const handleButton1 = () => {
        window.location.href = "/st_answeredlist"
    }
    const handleButton2 = () => {
        window.location.href = "/st_querylist"
    }
    return (
        <div className="container p-5">
            <div className="text-center my-3">
                <h2 className="text-white">Controller</h2>
            </div>
            <div className="text-center my-5">
                <Button variant="success" onClick={handleButton1}>Answered Query</Button>
                <Button variant="danger" onClick={handleButton2}>To be answered</Button>
            </div>
        </div>
    )
}

export default st_button;