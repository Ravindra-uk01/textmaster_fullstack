import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { loggedIn } = useSelector((state)=> state.user); 
    const navigate = useNavigate();

    console.log('loggedIn is ', loggedIn)

    useEffect(() => {
        if (!loggedIn) {
            navigate("/home"); // Redirect if not logged in
        }
    }, [loggedIn, navigate]);

    if (!loggedIn) {
        return null; 
        //  <Navigate to="/home" replace />; 
    }

    return children; 
}

export default ProtectedRoute;