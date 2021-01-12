import React, { useState, useEffect, createContext } from 'react';
import Axios from "axios"

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
