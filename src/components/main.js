import React, { useContext } from 'react';
import { AuthContext } from '../contextapi/authContext';


const Home = () => {
    const [user, setUser] = useContext(AuthContext).uso;
    return (
        <div className="container mt-5 text-center">
            <h1 >WELCOME</h1>
            <h5>{user.user?.email}</h5>
        </div>
    )
}
export default Home;

