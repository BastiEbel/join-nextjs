"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import styles from "./contact-info.module.css";
import deleteItem from "@/public/images/delete.png";
import edit from "@/public/images/edit.png";

import { contactColors } from "@/constants/contact-colors";
import OpenModal, { ModalHandle } from "@/ui/OpenModal";
import InformationBox from "@/ui/InformationBox";
import { ContactData } from "@/types/type-data";

import { deleteContact } from "@/actions/contact-action";
import AddOrEdit from "./add-or-edit";
import { closeModal, openModal } from "@/utils/open-modal";
import { getInitials } from "@/utils/initials-character";

interface ContactInfoProps {
  contactInfo: ContactData;
  onDeleteContact: () => void;
  reloadContactList: () => void;
}

export default function ContactInfo({
  contactInfo,
  onDeleteContact,
  reloadContactList,
}: ContactInfoProps) {
  const dialogRef = useRef<ModalHandle>(null) as React.RefObject<ModalHandle>;
  const [onEditMode, setOnEditMode] = useState(false);
  const [contactData, setContactData] = useState<ContactData>(contactInfo);
  const initialsContact = getInitials(contactData.name);

  useEffect(() => {
    setContactData(contactInfo);
  }, [contactInfo]);

  function onEditHandler() {
    setOnEditMode(true);
    openModal(dialogRef);
  }

  function onCloseHandler() {
    setOnEditMode(false);
    closeModal(dialogRef);
  }

  function handleContactUpdated() {
    toast.success("Contact updated successfully!", {
      autoClose: 1000,
      onClose: () => {
        reloadContactList();
        closeModal(dialogRef);
      },
    });
  }

  function onOpenDeleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    setOnEditMode(false);
    e.preventDefault();
    openModal(dialogRef);
  }
  async function onDeleteHandler(contactData: ContactData) {
    if (!contactData.id) {
      alert("Contact did not found.");
      return;
    }
    await deleteContact(contactData.id);
    toast.success("Contact deleted successfully!", {
      autoClose: 500,
      onClose: () => {
        closeModal(dialogRef);
        onDeleteContact();
      },
    });
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        {onEditMode ? (
          <AddOrEdit
            contactDataInfo={contactData}
            onClose={onCloseHandler}
            addContact={false}
            onContactUpdated={handleContactUpdated}
          />
        ) : (
          <InformationBox
            onClose={() => {
              closeModal(dialogRef);
            }}
            title="Delete Contact"
            description="You are sure do you want delete the contact?"
            info={contactInfo}
            btnName="Delete"
            onClick={() => onDeleteHandler(contactInfo)}
          />
        )}
      </OpenModal>
      <div className={styles["name-container"]}>
        <div
          className={styles["name-item"]}
          style={{
            backgroundColor:
              contactColors[initialsContact.charAt(0).toUpperCase()],
          }}
        >
          {initialsContact}
        </div>
        <div className={styles["name-info"]}>
          <h1>{contactData.name}</h1>
          <div className={styles["name-info-btn"]}>
            <span onClick={onEditHandler}>
              <Image src={edit} alt="Edit Contact" />
              Edit
            </span>
            <span onClick={onOpenDeleteHandler}>
              <Image src={deleteItem} alt="Delete Contact" />
              Delete
            </span>
          </div>
        </div>
      </div>
      <div className={styles["name-info-line"]}>
        <h2>Contact Information</h2>
        <span>
          <b>Email:</b>
          <p style={{ color: "blue" }}>{contactData.email}</p>
        </span>
        <span>
          <b>Phone:</b>
          <p>
            {contactData.zipCode}
            {contactData.phone}
          </p>
        </span>
      </div>
    </>
  );
}
