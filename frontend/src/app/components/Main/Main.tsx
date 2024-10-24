import { Information } from './Information/Information';

import styles from './Main.module.css';
import ToDo from './Todo/ToDo';

export function Main() {
  return (
    <main className={styles.wrapper}>
      <Information />
      <ToDo />
    </main>
  );
}