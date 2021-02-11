import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const token = localStorage.getItem("token");

    const [isLoggedin, setIsLoggedin] = useState(!!localStorage.getItem("token"));

    const [user, setUser] = useState('')
    const token = useState(localStorage.getItem("token"))

    useEffect(() => {
        if (isLoggedin) {
            const connectedUser = JSON.parse(localStorage.getItem("user"))
            setUser(connectedUser)
        }
    }, [isLoggedin])

    console.log(user);


    // const [user, setUser] = useState(
    //     {
    //         token: localStorage.getItem("token"),
    //         user: JSON.parse(localStorage.getItem("user"))
    //     }
    // );

    // const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem("token") !== null)

    const [isAdmin, setIsAdmin] = useState(user.role === 'admin')
    console.log(isAdmin);

    return (
        <AuthContext.Provider value={
            {
                uso: [user, setUser],
                login: [isLoggedin, setIsLoggedin],
                isAdmin: [isAdmin, setIsAdmin],
                token: token
            }
        } >
            {children}
        </AuthContext.Provider>
    )
}
