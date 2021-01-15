import React, { useState } from 'react'
import Routes from './routes'
import { AuthProvider } from './contextapi/authContext';

const App = () => {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider >
  );
}

export default App;

