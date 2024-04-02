import React from 'react';
import './logoutButton.css';
import useAuthStore from '../../../../authStore';

function LogoutButton() {
    const setToken = useAuthStore(state => state.setToken); 

    const handleLogout = async () => {
        const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users/logout', {
            method: 'GET',
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
              },
        });

        if (response.ok) {
            setToken(null);
            sessionStorage.removeItem('token'); 
            window.location.reload();
        } else {
            console.error('Logout failed');
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            <img src="multimedia/logout.png" alt="Logout Icon" />
        Logout
        </button>
    );
}

export default LogoutButton;