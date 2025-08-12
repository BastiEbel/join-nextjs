"use client";

import { useActionState, useEffect, useState } from "react";
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
import { addNewContact, editContact } from "@/actions/contact-action";
import Button from "@/ui/Button";
import Input from "@/ui/Input";

type FormState = {
  errors?: { [key: string]: string };
  formData?: FormData | undefined;
  message?: string;
};
interface AddOrEditProps {
  onClose: () => void;
  addContact: boolean;
  contactDataInfo?: ContactData;
  onContactAdded?: () => void;
  onContactUpdated?: () => void;
}

export default function AddOrEdit({
  onClose,
  addContact,
  contactDataInfo,
  onContactAdded,
  onContactUpdated,
}: AddOrEditProps) {
  const [changeImage, setChangeImage] = useState(clear);
  const [cancelImage, setCancelImage] = useState(clear);
  const [countryCode, setCountryCode] = useState(
    contactDataInfo?.zipCode ?? "+49"
  );
  const [hasClosed, setHasClosed] = useState(false);

  const [formState, formActions] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      if (addContact) {
        return (await addNewContact(prevState, formData)) ?? {};
      } else if (contactDataInfo?.id) {
        formData.set("id", contactDataInfo.id);
        return (
          (await editContact(contactDataInfo.id, prevState, formData)) ?? {}
        );
      }
      return {};
    },
    {}
  );

  useEffect(() => {
    if (
      (formState.message === "Contact created successfully" ||
        formState.message === "Contact updated successfully") &&
      !hasClosed
    ) {
      if (addContact && onContactAdded) onContactAdded();
      if (!addContact && onContactUpdated) onContactUpdated();

      setHasClosed(true);
      onClose();
    }
  }, [
    formState.message,
    onContactAdded,
    onClose,
    hasClosed,
    onContactUpdated,
    addContact,
  ]);

  useEffect(() => {
    setHasClosed(false);
  }, [addContact, contactDataInfo]);

  function onCancelHandler() {
    onClose();
  }

  return (
    <>
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
        <Image
          width={28}
          height={28}
          className={styles["profilImage"]}
          src={profilIcon}
          alt="Profil"
        />
        <Image
          onClick={onCancelHandler}
          onMouseOver={() => setCancelImage(hoverclear)}
          onMouseLeave={() => setCancelImage(clear)}
          className={styles["cancelImage"]}
          src={cancelImage}
          alt="Close"
        />
        <div>
          <form className={styles["form-contact"]} action={formActions}>
            {(["name", "email", "phone"] as Array<keyof ContactData>).map(
              (field) => (
                <div key={field} className={`${styles["container-input"]}`}>
                  {field === "phone" && (
                    <>
                      <CountryCodeSelector
                        zipCode={(code) => setCountryCode(code)}
                        instanceId="country-code-select"
                        value={countryCode}
                      />
                      <input type="hidden" name="zipCode" value={countryCode} />
                    </>
                  )}
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
                    type={field === "email" ? "email" : "text"}
                    required={field !== "phone"}
                    placeholder={
                      field === "phone"
                        ? "170 1234567"
                        : field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    defaultValue={contactDataInfo?.[field] ?? ""}
                  />
                </div>
              )
            )}
            {formState.errors &&
              Object.values(formState.errors).map((error, idx) => (
                <span key={idx} className="error">
                  {error}
                </span>
              ))}

            <div className={styles["container-btn"]}>
              <Button
                mouseOver={() => setChangeImage(hoverclear)}
                mouseLeave={() => setChangeImage(clear)}
                onClick={onCancelHandler}
                className={styles["cancel-btn"]}
              >
                Cancel
                <Image src={changeImage} alt="X" />
              </Button>
              <Button className={styles["add-contact-btn"]}>
                {addContact ? "Add Contact" : "Save Changes"}
                <Image src={check} alt="X" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
