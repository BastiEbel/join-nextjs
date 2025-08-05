import { TaskData } from "@/types/type-data";
import styles from "./taskcard.module.css";

type TaskCardProps = {
  addTask: TaskData;
};

export default function TaskCard({ addTask }: TaskCardProps) {
  function getPrioClass(prio: string) {
    switch (prio) {
      case "Urgent":
        return `${styles.prio} ${styles.prioUrgent}`;
      case "Medium":
        return `${styles.prio} ${styles.prioMedium}`;
      case "Low":
        return `${styles.prio} ${styles.prioLow}`;
      default:
        return styles.prio;
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>
          {String(addTask.category ?? "")}
        </span>
        <span className={getPrioClass(addTask.prio)}>{addTask.prio}</span>
      </div>
      <h3 className={styles.title}>{addTask.title}</h3>
      <p className={styles.description}>{addTask.description}</p>
      <div className={styles.footer}>
        <span className={styles.dueDate}>
          Fällig: {new Date(addTask.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
