import React from "react";
import { useNavigate } from "react-router-dom";

// ViewDeletedUsersButton component
// Botão que redireciona o user para a página de visualização de users deletados

function ViewDeletedUsersButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/deletedUsers");
    };
    
    return (
        <button className="aside-button" onClick={handleClick}>
        View Deleted Users
        </button>
    );
}

export default ViewDeletedUsersButton;