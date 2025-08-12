"use client";

import Image from "next/image";
import { useState, ChangeEvent, useActionState, useEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";

import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { toast } from "react-toastify";

import styles from "./login.module.css";
import leftArrowIcon from "@/public/images/arrowLeft.png";
import { inputFields } from "@/constants/input-field";
import { auth } from "@/actions/auth-action";

type FormState = {
  errors?: { [key: string]: string };
  formData?: FormData | undefined;
  message?: string;
  user?: string;
};

type AuthFormProps = {
  mode: "login" | "signup";
  oversign: string;
};

export default function AuthForm({ mode, oversign }: AuthFormProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
  const pathName = usePathname();
  const router = useRouter();
  const [formState, formActions] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      return await auth(mode, prevState, formData);
    },
    {}
  );
  useEffect(() => {
    if (formState.message === "successful") {
      toast.success(`Welcome ${formState.user}!`, {
        autoClose: 1000,
        onClose: () => {
          redirect("/summary");
        },
      });
    }
    if (formState.errors) {
      Object.values(formState.errors).forEach((error) => {
        toast.error(error, { autoClose: 1000 });
      });
    }
  }, [formState]);

  function handleFocus(name: string) {
    setIsFocused((prev) => ({ ...prev, [name]: true }));
  }

  function handleBlur(name: string) {
    setIsFocused((prev) => ({ ...prev, [name]: false }));
  }

  return (
    <>
      <form action={formActions} className={styles["form-signIn"]}>
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
              </div>
            ))}
          {formState.errors &&
            Object.values(formState.errors).map((error, idx) => (
              <span key={idx} className={styles["error"]}>
                {error}
              </span>
            ))}
        </div>

        <div className={styles["container-btn"]}>
          {mode === "login" ? (
            <>
              <Button type="submit" className={styles["btn-login"]}>
                Log in
              </Button>
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
    </>
  );
}
