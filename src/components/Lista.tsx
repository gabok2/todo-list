import { CheckCircle, Circle, Trash } from "phosphor-react";

import styles from "./Lista.module.css";

interface ListTask {
  title: string;
  completed: (id: number) => void;
  remove: (id: number) => void;
  isCompleted: boolean;
  tasks: number;
}


export function Lista({ title, completed, remove, isCompleted, tasks }: ListTask) {


  return (
    <div className={styles.lista}>
      <button type="button" onClick={() => completed(tasks)} className={styles.circle}>
        {isCompleted ? (
          <CheckCircle className={styles.check} size={24} color="#5e60ce" />
        ) : (
          <Circle size={24} color="#4ea8de" />
        )}
      </button>
      <p className={isCompleted ? styles.textCompleted : ""}>{title}</p>
      <button type="button" onClick={() => remove(tasks)} className={styles.trash}>
        <Trash size={24} color="#808080" />
      </button>
    </div>
  )
}