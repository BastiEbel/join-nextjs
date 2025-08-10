"use client";

import React, { useState, useRef, useEffect } from "react";
import OpenModal, { ModalHandle } from "@/ui/OpenModal";
import Button from "@/ui/Button";
import Image from "next/image";

import imgContact from "@/public/images/person_add.png";
import styles from "./contact.module.css";
import AddOrEditContact from "./add-or-edit";
import ContactList from "./contact-list";
import ContactInfo from "./contact-info";
import { ContactData } from "@/types/type-data";
import { getAllContacts } from "@/actions/get-data";

export default function Contact() {
  const dialogRef = useRef<ModalHandle>(null);

  const [contactData, setContactData] = useState<ContactData[]>([]);
  const [selectedContact, setSelectedContact] = useState<null | ContactData>(
    null
  );

  useEffect(() => {
    reloadContacts();
  }, []);

  async function reloadContacts() {
    await getAllContacts().then(setContactData);
    setSelectedContact(null);
  }

  function onContactClickHandler(contact: ContactData) {
    setSelectedContact(contact);
  }

  function onAddPersonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }

  function onCloseHandler() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }
  return (
    <>
      <OpenModal ref={dialogRef}>
        <AddOrEditContact
          onClose={onCloseHandler}
          addContact={true}
          onContactAdded={reloadContacts}
        />
      </OpenModal>

      <nav className={styles["nav-contacts"]}>
        <Button
          onClick={onAddPersonHandler}
          className={styles["btn-addPerson"]}
        >
          Add new contact <Image src={imgContact} alt="Add Person" />
        </Button>

        {contactData && contactData.length > 0 ? (
          <ContactList
            contacts={contactData}
            onContactClick={onContactClickHandler}
          />
        ) : (
          <p>No contact data found</p>
        )}
      </nav>
      <div className={styles["container-contact-info"]}>
        <div className={styles["contact-info"]}>
          <h1>Contacts</h1>
          <div></div>
          <h2>Better with a team</h2>
        </div>
        <div className={styles["contact-info-text"]}>
          {selectedContact ? (
            <ContactInfo
              onDeleteContact={reloadContacts}
              contactInfo={selectedContact as ContactData}
            />
          ) : (
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "lightgray",
                marginTop: "128px",
              }}
            >
              Select a person to view details
            </p>
          )}
        </div>
      </div>
    </>
  );
}
