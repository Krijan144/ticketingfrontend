import React, { useState, createContext } from 'react';
import App from '../App';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAutheticated, setIsAutheticated] = useState(false);
    const [user, setUser] = useState(
        {
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem("user"))
        }
    );


    return (
        <AuthContext.Provider value={
            { auth: [isAutheticated, setIsAutheticated], uso: [user, setUser] }
        } >
            {children}
        </AuthContext.Provider>
    )
}
