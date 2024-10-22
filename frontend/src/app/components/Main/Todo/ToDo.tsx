import { useCallback } from 'react';
import { useToDo } from '../../../../hooks/useToDo';

import styles from './ToDo.module.css';
import { Card } from './Card/Card';

export default function ToDo() {
 const { isEmpty } = useToDo();

  const EmptyListComponent = useCallback(
    () => (
      <div className={styles.empty__list}>
        <div className={styles.empty__list_titles}>
          <h3>Você ainda não tem tarefas cadastradas.</h3>
          <h4>Crie tarefas e organize seus itens a fazer.</h4>
        </div>
      </div>
    ),
    []
  );

  return (
    <section className={styles.wrapper}>
      {isEmpty ? <EmptyListComponent /> : <Card />}
    </section>
  );
}