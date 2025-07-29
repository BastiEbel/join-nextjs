import SummaryContainer from "@/components/summary-container/summary-container";
import styles from "./page.module.css";

import { summaryData } from "@/utils/summary-data";

export default function SummaryPage() {
  function greetingHandler() {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Day";
    } else {
      return "Good Evening";
    }
  }

  return (
    <main className={styles["container"]}>
      <header className={styles["oversign"]}>
        <h1>Join 360</h1>
        <div className={styles["dash"]}></div>
        <h2>Key Metrics at a Glance</h2>
      </header>
      <main className={styles["container-summary"]}>
        <div className={styles["summary-grid"]}>
          {summaryData.map((item) => (
            <SummaryContainer
              key={item.id}
              image={item.image}
              amount={item.amount}
              description={item.description}
              date={item.date}
              title={item.title}
              width={item.width}
              className={styles["summary-item"]}
            />
          ))}
        </div>
        <div className={styles["container-greeting"]}>
          <h3>{greetingHandler()},</h3>
          <h4>Sebastian Ebel</h4>
        </div>
      </main>
    </main>
  );
}
