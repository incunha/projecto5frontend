import React from "react";
import { useNavigate } from "react-router-dom";

// ViewDeletedTasksButton component
// Botão que redireciona o user para a página de visualização de tasks deletadas

function ViewDeletedTasksButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/deletedTasks");
    };
    
    return (
        <button className="aside-button" onClick={handleClick}>
        View Deleted Tasks
        </button>
    );
}

export default ViewDeletedTasksButton;