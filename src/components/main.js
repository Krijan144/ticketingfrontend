import React, { useContext } from 'react';
import { AuthContext } from '../contextapi/authContext';


const Home = () => {

    // const [user, setUser] = useContext(AuthContext).uso;

    return (
        <div className="container mt-5 text-center welcome" >
            <h1 >WELCOME </h1>
            <h3>We are here to help.</h3>
        </div>
    )
}
export default Home;

