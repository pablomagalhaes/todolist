/* eslint-disable jsx-a11y/label-has-associated-control */
import { Trash } from 'phosphor-react';
import { useToDo } from '../../../../../hooks/useToDo';

import styles from './Card.module.css';

export function Card() {
  const { toggleTodo, todos, removeTodo } = useToDo();

  console.log('todos', todos)

  return (
    <ul className={styles.container}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.wrapper}>
          <button
            className={styles.checkbox}
            type="button"
            onClick={() => toggleTodo(todo.id, !todo.completed)}
          >
            <div
              id="checkbox"
              className={`${styles.check}  ${todo.completed ? styles.checked : ''}`}
            />
            <label htmlFor="checkbox" />
          </button>

          <div
            className={`${styles.text} ${
              todo.completed ? styles.strikethroughText : ''
            }`}
          >
            <p>{todo.title}</p>
          </div>

          <button
            onClick={() => removeTodo(todo.id)}
            className={styles.trash}
            type="button"
            title="Deletar ToDo"
          >
            <Trash size={20} />
          </button>
        </li>
      ))}
    </ul>
  );
}