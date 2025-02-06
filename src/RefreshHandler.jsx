
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(localStorage.getItem('loggedInUser'));
            if (location.pathname === '/Medora/' ||
                location.pathname === '/Medora/login' ||
                location.pathname === '/Medora/signup'
            ) {
                navigate('/Medora/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefreshHandler