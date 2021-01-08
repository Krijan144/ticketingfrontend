import React, { Component, useState } from 'react';

export const AuthContext = React.createContext(null);

export const initialState = {
    token: localStorage.getItem('token'),
    isLoggedin: false,
    isLoggedPending: false,
    loginError: null
// export const ContextProvider = props =>{
//     const [isLoggedinPending,setLoginPending] = useState(false)
//     const [isloggedIn,setLoggedIn] = useState(false)
//     const [isloggedinError,setLoggedInError] = useState(null)

//     const login = (error) =>{
//         setLoginPending(true),
//         setLoggedIn(false),
//         isLoggedinError(null)


//         if (!error){
//             setLoggedIn(true)
//         }
//         else{
//             setLoggedInError(error)
//         }
//     }
//     const logout = () => {
//         setLoggedIn(false),
//         setLoginPending(false),
//         isLoggedInError(null)

//     }
// }

