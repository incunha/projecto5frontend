import { render, fireEvent } from '@testing-library/react';
import TaskCard from './taskCard';
import '@testing-library/jest-dom';

// Verifica se o TaskCard é renderizado
test('renders TaskCard', () => {
    const task = { title: 'Test Task', priority: 100 };
    const { getByText } = render(<TaskCard task={task} active={true} />);
    expect(getByText('Test Task')).toBeInTheDocument();
  });
  

  // Verifica se a classe CSS do cartão de tarefa muda com base no estado `active`
test('changes task card class based on active state', () => {
    const task = { title: 'Test Task', priority: 100 }; 
    // Quando `active` é verdadeiro, a classe deve ser 'task-card active'
    const { container: activeContainer } = render(<TaskCard task={task} active={true} />);
    expect(activeContainer.firstChild).toHaveClass('task-card active'); 
    // Quando `active` é falso, a classe deve ser 'task-card inactive'
    const { container: inactiveContainer } = render(<TaskCard task={task} active={false} />);
    expect(inactiveContainer.firstChild).toHaveClass('task-card inactive');
  });

  //Verifica se o cartão de tarefa é arrastável quando `active` é verdadeiro e não é arrastável quando `active` é falso
  test('task card is draggable when active is true and not draggable when active is false', () => {
    const task = { title: 'Test Task', priority: 100 };
    
    // Quando `active` é verdadeiro, draggable deve ser 'true'
    const { container: activeContainer } = render(<TaskCard task={task} active={true} />);
    expect(activeContainer.firstChild).toHaveAttribute('draggable', 'true');
    
    // Quando `active` é falso, draggable deve ser 'false'
    const { container: inactiveContainer } = render(<TaskCard task={task} active={false} />);
    expect(inactiveContainer.firstChild).toHaveAttribute('draggable', 'false');
  });