import React from 'react';
import { Button } from 'react-bootstrap';
import './css/queryListButton.css'

const button = () => {
    const handleButton1 = () => {
        window.location.href = "/ans_query"
    }
    const handleButton2 = () => {
        window.location.href = "/querylist"
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="container queryListButton shadow-lg p-3 mb-5">
                <div className="text-center my-3">
                    <h2>Your Query</h2>
                </div>
                <div className="text-center my-5">
                    <Button variant="success" onClick={handleButton1}>Answered Query</Button>{'  '}
                    <Button variant="danger" onClick={handleButton2}>To be answered</Button>
                </div>
            </div>
        </div>
    )
}

export default button;