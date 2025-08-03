"use client";

import React, { useState, useRef } from "react";
import OpenModal, { ModalHandle } from "@/ui/OpenModal";
import Button from "@/ui/Button";
import Image from "next/image";

import imgContact from "@/public/images/person_add.png";
import styles from "./contact.module.css";
import AddOrEditContact from "./add-or-edit";
import ContactList from "./contact-list";
import ContactInfo from "./contact-info";
import { ContactData } from "@/types/type-data";

export default function Contact() {
  const dialogRef = useRef<ModalHandle>(null);

  // Replace with actual data fetching or mock data as needed
  const contactData: Array<ContactData> = [
    {
      id: "1",
      userId: "1",
      name: "John Doe",
      email: "john@example.com",
      // Add other required fields if needed
    },
    // Add more contacts as needed
  ];
  const [selectedContact, setSelectedContact] = useState<null | ContactData>(
    null
  );

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
        <AddOrEditContact onClose={onCloseHandler} addContact={true} />
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
              contactInfo={selectedContact as ContactData}
              /* onDelete={() => setSelectedContact(null)} */
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
