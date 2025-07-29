import TaskForm from "@/components/task-form/task-form";

import styles from "./page.module.css";

export default function AddTaskPage() {
  return (
    <main className={styles["container-addTask"]}>
      <h1>Add Task</h1>
      <TaskForm />
    </main>
  );
}
