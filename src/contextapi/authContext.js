import React, { Component, useState } from 'react';

export const AuthContext = React.createContext(null);

export const initialState = {
    token: localStorage.getItem('token'),
    isLoggedin: false,
    isLoggedPending: false,
    loginError: null,
}