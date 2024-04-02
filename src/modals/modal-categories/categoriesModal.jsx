import React, { useEffect, useState } from 'react';
import useCategoryStore from '../../../categoryStore';
import ConfirmationModal from '../modal-confirmation/confirmationModal';
import './categoriesModal.css';
import WarningModal from '../modal-info/warningModal';

function CategoriesModal({isOpen, onRequestClose}) {
  const categories = useCategoryStore(state => state.categories);
  const fetchCategories = useCategoryStore(state => state.fetchCategories);
  const deleteCategory = useCategoryStore(state => state.deleteCategory);
  const createCategory = useCategoryStore(state => state.createCategory);
  const updateCategory = useCategoryStore(state => state.updateCategory);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const isWarningModalOpen = useCategoryStore(state => state.isWarningModalOpen);
  const warningMessage = useCategoryStore(state => state.warningMessage);
  const setWarningModalOpen = useCategoryStore(state => state.setWarningModalOpen);


  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  const handleDelete = (categoryName) => {
    setCategoryToDelete(categoryName);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteCategory(categoryToDelete);
    if (response.status === 409) {
      setWarningModalOpen(true);
    } else {
      setIsConfirmationModalOpen(false);
    }
  };
  

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setNewCategoryName(category.name);
  };

  const handleConfirmEdit = async () => {
    await updateCategory(categoryToEdit, newCategoryName);
    await fetchCategories();
      setCategoryToEdit(null);
    }
  

  const handleCreate = async () => {
    await createCategory(newCategoryName);
    await fetchCategories();
      setIsCreating(false);
    }
  

  if (!isOpen) {
    return null;
  }

  return (
    <div className="categories-modal-overlay">
      <div className="categories-modal">
      <button className="close-buttonCategories" onClick={() => {onRequestClose(); setIsCreating(false); setCategoryToEdit(null);}}>X</button>
        {isCreating ? (
          <div className="modalEditCategories">
            <label>
              Name:
              <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
            </label>
            <div className='button-groupCategories'>
             <button className='myButton' onClick={() => setIsCreating(false)}>Cancel</button> 
            <button className = 'myButton' onClick={handleCreate}>Add</button>     
            </div>
          </div>
        ) : categoryToEdit ? (
          <div className="modalEditCategories">
            <label>
              New name:
              <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
            </label>
            <div className='button-groupCategories'>
            <button className = 'myButton' onClick={() => setCategoryToEdit(null)}>Cancel</button>
            <button className = 'myButton' onClick={handleConfirmEdit}>Confirm</button>
            </div>
          </div>
        ) : (
          <div className="modalCategories">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              {categories.map(category => (
  <tr key={category.id}>
    <td>{category.name}</td>
    <td>
      <button className="icon-button" onClick={() => handleEdit(category)}>✏️</button>
    </td>
    <td>
      <button className="icon-button" onClick={() => handleDelete(category.name)}>🗑️</button>
    </td>
  </tr>
))}
              </tbody>
            </table>
            <div className="button-groupCategories">
            <button className='myButton' onClick={() => {setIsCreating(true); setNewCategoryName('');}}>Create</button>
            </div>
          </div>
        )}
       
      </div>
      <ConfirmationModal
  isOpen={isConfirmationModalOpen} 
  onRequestClose={() => setIsConfirmationModalOpen(false)} 
  message="Are you sure you want to delete this category?" 
  onConfirm={handleConfirmDelete}
/>
{isWarningModalOpen ? <WarningModal message={warningMessage} onClose={() => setWarningModalOpen(false)} /> : null}
    </div>
  );
}

export default CategoriesModal;