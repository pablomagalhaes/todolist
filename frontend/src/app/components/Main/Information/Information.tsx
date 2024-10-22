import { useToDo } from '../../../../hooks/useToDo';

import styles from './Information.module.css';

export function Information() {
  const { totalTodos, totalDoneTodos } = useToDo();

  return (
    <section className={styles.info}>
      <section className={styles.info__data}>
        <span className={styles.info__title}>Created Tasks </span>
        <div className={styles.info_value_wrapper}>
          <small className={styles.info__value}>{totalTodos}</small>
        </div>
      </section>

      <section className={styles.info__data}>
        <span className={`${styles.info__title} ${styles.info__title_done}`}>
          Done Tasks
        </span>
        <div className={styles.info_value_wrapper}>
          <small className={styles.info__value}>{totalDoneTodos}</small>
        </div>
      </section>
    </section>
  );
}