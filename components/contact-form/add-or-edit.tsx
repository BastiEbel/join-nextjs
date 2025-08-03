"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import joinLogoWhite from "@/public/images/joinLogoVector.png";
import profilIcon from "@/public/images/profil.png";
import clear from "@/public/images/clear.png";
import check from "@/public/images/check.png";
import hoverclear from "@/public/images/hoverclear.png";
import person from "@/public/images/person.png";
import mail from "@/public/images/mail.png";
import phone from "@/public/images/call.png";
import styles from "./addoredit.module.css";
import { ContactData } from "@/types/type-data";

import CountryCodeSelector from "@/ui/CountryCodeSelector";
import Button from "@/ui/Button";
import Input from "@/ui/Input";

interface AddOrEditProps {
  onClose: () => void;
  addContact: boolean;
  contactDataInfo?: ContactData;
}
function AddOrEdit({ onClose, addContact, contactDataInfo }: AddOrEditProps) {
  const [changeImage, setChangeImage] = useState(clear);

  function onCancelHandler() {
    onClose();
  }

  return (
    <div className={styles["container-addOrEdit"]}>
      <div className={styles["oversign-addOrEdit"]}>
        <Image
          className={styles["contact-logo"]}
          src={joinLogoWhite}
          alt="Join Logo"
        />
        <h1 className={styles["title-name"]}>
          {addContact ? "Add Contact" : "Edit Contact"}
        </h1>
        {addContact && (
          <p className={styles["add-text"]}>Task are better with a Team!</p>
        )}
        <div className={styles["contact-spacer"]}></div>
      </div>
      <Image className={styles["profilImage"]} src={profilIcon} alt="Profil" />
      <Image
        onClick={onCancelHandler}
        onMouseOver={() => setChangeImage(hoverclear)}
        onMouseLeave={() => setChangeImage(clear)}
        className={styles["cancelImage"]}
        src={changeImage}
        alt="Close"
      />
      <div>
        <form className={styles["form-contact"]} action="">
          {(["name", "email", "phone"] as Array<keyof ContactData>).map(
            (field) => (
              <div key={field} className={`${styles["container-input"]}`}>
                {field === "phone" && <CountryCodeSelector value={"+49"} />}
                <Input
                  className={styles["input-contact"]}
                  icon={
                    field === "name"
                      ? person
                      : field === "email"
                      ? mail
                      : field === "phone"
                      ? phone
                      : undefined
                  }
                  name={field}
                  //onChange={onInputChangeHandler}
                  type={field === "email" ? "email" : "text"}
                  //onFocus={() => onFocusHandler(field)}
                  //onBlur={() => onBlurHandler(field)}
                  required={field !== "phone"}
                  //value={inputData[field] || ""}
                  placeholder={
                    field === "phone"
                      ? "170 1234567"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                />
              </div>
            )
          )}
        </form>
        <div className={styles["container-btn"]}>
          <Button
            mouseOver={() => setChangeImage(hoverclear)}
            mouseLeave={() => setChangeImage(clear)}
            onClick={onCancelHandler}
            className={styles["cancel-btn"]}
          >
            Cancel
            <Image src={clear} alt="X" />
          </Button>
          <Button
            //onClick={onAddContactHandler}
            className={styles["add-contact-btn"]}
          >
            Add Contact
            <Image src={check} alt="X" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddOrEdit;
