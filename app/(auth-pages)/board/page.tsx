import Input from "@/ui/Input";

import Image from "next/image";
import Link from "next/link";

import search from "@/public/images/search.png";
import add from "@/public/images/add.png";

import styles from "./page.module.css";
import BoardSection from "@/components/board-section/board-section";

export default function BoardPage() {
  return (
    <main className={styles["container-board"]}>
      <header className={styles["header-board"]}>
        <h1>Board</h1>
        <div className={styles["section-search-task"]}>
          <div className={styles["input-findTask"]}>
            <Input
              type="text"
              placeholder="Find Task"
              required={false}
              className={styles["find-task"]}
              icon={search}
            />
          </div>
          <Link href="/addtask" className={styles["btn-addTask"]}>
            Add Task <Image width={32} height={32} src={add} alt="Add" />
          </Link>
        </div>
      </header>
      <section className={styles["container-board-task"]}>
        <BoardSection />
      </section>
    </main>
  );
}
