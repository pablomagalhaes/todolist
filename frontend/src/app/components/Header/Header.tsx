
import { InputField } from '../InputField/InputField';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <h1>Todo List</h1>
      <InputField />
    </header>
  );
}