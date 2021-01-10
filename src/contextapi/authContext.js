import React, { useState, createContext } from 'react';
import App from '../App';

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [isAutheticated, setIsAutheticated] = useState(false);


    return (
        <AuthContext.Provider value={[isAutheticated, setIsAutheticated]}>
            {props.children}
        </AuthContext.Provider>
    )
}