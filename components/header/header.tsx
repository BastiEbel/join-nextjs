"use client";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

import help from "@/public/images/help.png";
import styles from "./header.module.css";
import Button from "@/ui/Button";
import { logout } from "@/actions/auth-action";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/actions/get-data";
import { getInitials } from "@/utils/initials-character";
import { UserData } from "@/types/type-data";

export default function Header() {
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);

  const initalName = getInitials(user?.name || "");

  return (
    <header className={styles["containerHeader"]}>
      <ToastContainer hideProgressBar={true} closeButton={false} />
      <h1>Kanban Project Management</h1>
      <div className={styles["container-userInfo"]}>
        <Image src={help} alt="need help" />
        <p>{initalName}</p>
        <Button onClick={logout} className={styles["fancy-button"]}>
          Logout
        </Button>
      </div>
    </header>
  );
}
