import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // const [isAutheticated, setIsAutheticated] = useState(false);
    const [user, setUser] = useState(
        {
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem("user"))
        }
    );
    const [isLoggedin, setIsLoggedin] = useState(user.token !== null)
    // console.log(isLoggedin, "=====> status");


    return (
        <AuthContext.Provider value={
            { uso: [user, setUser], login: [isLoggedin, setIsLoggedin] }
        } >
            {children}
        </AuthContext.Provider>
    )
}
