import React from 'react';


// Componente funcional CategoriesButton responsável por renderizar o botão "Categories"
// Recebe uma função de clique como propriedade para manipular o evento de clique no botão

const CategoriesButton = ({ onClick }) => {
    return (
        <button className="aside-button" onClick={onClick}>
            Categories
        </button>
    );
};

export default CategoriesButton;