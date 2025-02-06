import React, { useState, useEffect } from 'react';// Corrected import
import axios from 'axios';

const Profile = () => {
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                if (!token) {
                    console.error("Token not found");
                    return;
                }else{
                    console.log(token)
                }
                const response = await fetch('http://localhost:8080/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Send the token in the header
                    },
                });

                const data = await response.json(); // Get response data
                console.log('User Details:', data); // Log the data for debugging

                if (response.ok) {
                    setUserDetails(data.userDetails); // Set the user details to state
                } else {
                    console.error('Error fetching user details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user details:-1', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div>
            <h1>Profile Details</h1>
            <h1>Profile Details</h1>
            <h1>Profile Details</h1>
            <h1>Profile Details</h1>
            <h1>Profile Details</h1>
            <h1>Profile Details</h1>
            <h1>Profile Details</h1>
            <h1>Profile Details</h1>
            <p><strong>Name:</strong> {userDetails.fullName}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <button onClick={() => window.location.href = '/update-profile'}>Edit Profile</button>
        </div>
    );
};

export default Profile;
