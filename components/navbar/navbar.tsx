"use client";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";
import profilLogo from "@/public/images/joinLogoVector.png";
import summary from "@/public/images/summary.png";
import addTask from "@/public/images/addTask.png";
import board from "@/public/images/board.png";
import contacts from "@/public/images/contacts.png";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [nav, setNav] = useState<boolean>(true);
  const pathName = usePathname();

  const navItems = [
    { name: "Summary", path: `/summary`, img: summary },
    { name: "Add Task", path: `/addTask`, img: addTask },
    { name: "Board", path: `/board`, img: board },
    { name: "Contacts", path: `/contacts`, img: contacts },
  ];

  function toggleNav() {
    setNav(!nav);
  }
  /* function closeNav() {
        setNav(false);
      } */
  return (
    <>
      <div
        onClick={toggleNav}
        className={`${styles["menu-icon"]} ${nav ? styles["active"] : ""}`}
      >
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <nav className={`${styles["nav-menu"]} ${nav ? styles["active"] : ""}`}>
        <div className={styles["navbar"]}>
          <Image
            priority
            style={{ width: "auto", height: "auto" }}
            src={profilLogo}
            alt="Logo Join"
            className={styles["logo"]}
          />
          {nav && (
            <ul>
              {navItems.map((item) => (
                <li
                  className={pathName === item.path ? styles["selectedBG"] : ""}
                  key={item.name}
                >
                  <Image
                    height={24}
                    width={24}
                    priority
                    src={item.img}
                    alt={item.name}
                  />
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          )}
          <Link href="/dataProtection">Data Protection</Link>
        </div>
      </nav>
    </>
  );
}
