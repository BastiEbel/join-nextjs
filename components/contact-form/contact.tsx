"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

import OpenModal, { ModalHandle } from "@/ui/OpenModal";
import Button from "@/ui/Button";

import imgContact from "@/public/images/person_add.png";
import styles from "./contact.module.css";
import AddOrEditContact from "./add-or-edit";
import ContactList from "./contact-list";
import ContactInfo from "./contact-info";
import { ContactData } from "@/types/type-data";
import { getAllContacts } from "@/actions/get-data";
import { closeModal, openModal } from "@/utils/open-modal";
import { toast } from "react-toastify";

export default function Contact() {
  const dialogRef = useRef<ModalHandle>(null) as React.RefObject<ModalHandle>;

  const [contactData, setContactData] = useState<ContactData[]>([]);
  const [selectedContact, setSelectedContact] = useState<null | ContactData>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const reloadContacts = useCallback(async () => {
    setLoading(true);
    const contacts = await getAllContacts();
    setContactData(contacts);
    setLoading(false);
    setSelectedContact(null);
  }, []);

  useEffect(() => {
    reloadContacts();
  }, [reloadContacts]);

  function onDeleteContactHandler() {
    reloadContacts();
  }

  function onContactAdded() {
    toast.success("Contact added successfully!", {
      autoClose: 1000,
      onClose: () => {
        reloadContacts();
      },
    });
  }

  function onContactClickHandler(contact: ContactData) {
    setSelectedContact(contact);
  }

  function onAddPersonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    openModal(dialogRef);
  }

  function onCloseHandler() {
    closeModal(dialogRef);
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        <AddOrEditContact
          onClose={onCloseHandler}
          addContact={true}
          onContactAdded={onContactAdded}
        />
      </OpenModal>
      <nav className={styles["nav-contacts"]}>
        <Button
          onClick={onAddPersonHandler}
          className={styles["btn-addPerson"]}
        >
          Add new contact <Image src={imgContact} alt="Add Person" />
        </Button>
        {loading ? (
          <p>Loading contacts...</p>
        ) : contactData && contactData.length > 0 ? (
          <ContactList
            contacts={contactData}
            onContactClick={onContactClickHandler}
            activeContactId={selectedContact?.email}
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
              onDeleteContact={onDeleteContactHandler}
              contactInfo={selectedContact as ContactData}
              reloadContactList={reloadContacts}
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
