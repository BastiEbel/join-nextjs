import Image from "next/image";
import styles from "./page.module.css";
import logo from "@/public/images/joinLogo.png";

export default function Home() {
  return (
    <main className={styles["login-main"]}>
      <div>
        <Image className={styles["logo-img"]} src={logo} alt="Logo Image" />
        <div className={styles["container-signup"]}>
          <p>Not a Join user?</p>
          <button disabled={false} className={styles["btn-style"]}>
            Sign up
          </button>
        </div>
      </div>
    </main>
  );
}
