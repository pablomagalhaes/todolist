import { useContext } from 'react';
import { TodoContext, IToDoContextData } from '../context/ToDoContext';

export const useToDo = (): IToDoContextData => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useToDo must be used within a ToDoProvider');
  }
  return context;
};
