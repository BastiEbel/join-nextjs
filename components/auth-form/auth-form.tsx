"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { ToastContainer } from "react-toastify";

import styles from "./login.module.css";
import leftArrowIcon from "@/public/images/arrowLeft.png";
import { inputFields } from "@/constants/input-field";

type AuthFormProps = {
  mode: "login" | "signup";
  oversign: string;
};

export default function AuthForm({ mode, oversign }: AuthFormProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
  const pathName = usePathname();
  const router = useRouter();

  function handleFocus(name: string) {
    setIsFocused((prev) => ({ ...prev, [name]: true }));
  }

  function handleBlur(name: string) {
    setIsFocused((prev) => ({ ...prev, [name]: false }));
  }
  return (
    <>
      <form className={styles["form-signIn"]}>
        {mode === "signup" && (
          <Image
            width={32}
            height={32}
            priority
            onClick={() => router.push("/")}
            className={styles["arrow-left"]}
            src={leftArrowIcon}
            alt="left arrow"
          />
        )}
        <div className={styles["container-oversign"]}>
          <h1>{oversign}</h1>
          <div className={styles["vector"]}></div>
        </div>
        <div className={styles["container-inputs"]}>
          {inputFields
            .filter((inputProp) =>
              mode === "login"
                ? inputProp.placeholder === "Email" ||
                  inputProp.placeholder === "Password"
                : true
            )
            .map((inputProp) => (
              <div key={inputProp.name}>
                <div
                  className={`${styles["container-input"]} ${
                    inputProp.error ? styles["error-input"] : ""
                  } ${isFocused[inputProp.name] ? styles["focused"] : ""} ${
                    pathName === "/" && mode === "login" ? styles["d-none"] : ""
                  }`}
                >
                  <Input
                    className={styles["input-signIn"]}
                    name={inputProp.name}
                    required
                    placeholder={inputProp.placeholder}
                    type={inputProp.type}
                    icon={inputProp.icon}
                    onFocus={() => handleFocus(inputProp.name)}
                    onBlur={() => handleBlur(inputProp.name)}
                  />
                </div>
                {inputProp.error && (
                  <span className={styles["error"]}>{inputProp.error}</span>
                )}
              </div>
            ))}
        </div>
        <div className={styles["container-btn"]}>
          {mode === "login" ? (
            <>
              <Button className={styles["btn-login"]}>Log in</Button>
              <Button className={styles["btn-guest"]}>Guest Log in</Button>
            </>
          ) : (
            <div className={styles["container-signUp"]}>
              <span className={styles["police"]}>
                <label className={styles["custom-checkbox"]}>
                  <Input
                    className={styles["input"]}
                    required={false}
                    placeholder=""
                    checked={isChecked}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      if (e.target instanceof HTMLInputElement) {
                        setIsChecked(e.target.checked);
                      }
                    }}
                    type="checkbox"
                  />
                  <span className={styles["checkmark"]}></span>
                </label>
                <p>
                  <span>
                    I accept the&nbsp;
                    <a href="">Privacy police</a>
                  </span>
                </p>
              </span>
              <Button
                type="submit"
                disabled={!isChecked}
                className={styles["btn-login"]}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </form>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeButton={false}
      />
    </>
  );
}
