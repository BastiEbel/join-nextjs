import Image from "next/image";
import { ToastContainer } from "react-toastify";

import help from "@/public/images/help.png";
import styles from "./header.module.css";
import Button from "@/ui/Button";

export default function Header() {
  return (
    <header className={styles["containerHeader"]}>
      <ToastContainer hideProgressBar={true} closeButton={false} />
      <h1>Kanban Project Management</h1>
      <div className={styles["container-userInfo"]}>
        <Image src={help} alt="need help" />
        <p>SE</p>
        <Button className={styles["fancy-button"]}>Logout</Button>
      </div>
    </header>
  );
}
