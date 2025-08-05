import Image from "next/image";

import styles from "./page.module.css";
import logo from "@/public/images/joinLogo.png";
import AuthForm from "@/components/auth-form/auth-form";
import Button from "@/ui/Button";

export default async function Home({
  searchParams,
}: {
  searchParams: { mode?: string };
}) {
  const params = await searchParams;
  const mode: "login" | "signup" =
    params.mode === "signup" ? "signup" : "login";
  return (
    <main className={styles["login-main"]}>
      <div>
        <Image
          width={60}
          height={60}
          priority
          className={styles["logo-img"]}
          src={logo}
          alt="Logo Image"
        />
        {mode === "login" && (
          <div className={styles["container-signup"]}>
            <p>Not a Join user?</p>
            <Button className={styles["btn-style"]} href="?mode=signup">
              Sign up
            </Button>
          </div>
        )}
        <AuthForm
          mode={mode}
          oversign={mode === "signup" ? "Sign up" : "Login"}
        />
      </div>
    </main>
  );
}
