import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(
        {
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem("user"))
        }
    );

    const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem("token") !== null)
    // const [isAdmin, setIsAdmin] = useState(user.user?.role === 'admin')
    // console.log(isAdmin);


    return (
        <AuthContext.Provider value={
            { uso: [user, setUser], login: [isLoggedin, setIsLoggedin] }
        } >
            {children}
        </AuthContext.Provider>
    )
}
