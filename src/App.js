import React from 'react'
import Routes from './routes'
import { AuthProvider } from './contextapi/authContext';

const App = () => {
  // const [isAuthetiacated, setIsAutheticated] = useContext(AuthContext)

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>

  );

}

export default App;

