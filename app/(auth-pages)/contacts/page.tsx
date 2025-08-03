import Contact from "@/components/contact-form/contact";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <main className={styles["container-contacts"]}>
      <Contact />
    </main>
  );
}
