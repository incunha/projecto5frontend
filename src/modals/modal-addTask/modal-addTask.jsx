import React, { useState, useEffect } from 'react';
import useCategoryStore from '../../../categoryStore';
import useTasksStore from '../../../taskStore';
import './modal-addTask.css';

function AddTaskModal({ isOpen, onRequestClose }) {
  const categories = useCategoryStore(state => state.categories);
  const fetchCategories = useCategoryStore(state => state.fetchCategories);
  const fetchActiveTasks = useTasksStore(state => state.fetchActiveTasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [warning, setWarning] = useState('');
  

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  const handleCreate = async () => {
    if (!title || !description || !priority || !category || !startDate) {
      setWarning('Please fill in all fields');
      return;
    }

    const finalEndDate = endDate || '2199-12-31';

    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, priority, startDate, endDate: finalEndDate, category }),
      });

      if (!response.ok) {
        console.error(`Error creating task: ${response.statusText}`);
        return;
      }
      fetchActiveTasks();
      onRequestClose();
    } catch (error) {
      console.error(error);
    }
  };

  return isOpen ? (
    <div className={`add-task-modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="add-task-modal">
        <h2>Add Task</h2>
        <input className = "inputAddTaskTitle" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <div className = "containerAddTaskSelects">
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="100">Low</option>
          <option value="200">Medium</option>
          <option value="300">High</option>
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        </div>
        <div className = "containerAddTaskDates">
        <label className='dateLabel'>
          Start Date
          <input  type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label className='dateLabel'>
          End Date
          <input type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
        </div>
        {warning && <p className="warning">{warning}</p>}
        <div className="button-group-addTask">
         <button className='myButton' onClick={onRequestClose}>Cancel</button> 
        <button className='myButton' onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  ) : null;
}

export default AddTaskModal;