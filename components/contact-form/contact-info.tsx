"use client";

import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import styles from "./contact-info.module.css";
import deleteItem from "@/public/images/delete.png";
import edit from "@/public/images/edit.png";

import { contactColors } from "@/constants/contact-colors";
import OpenModal, { ModalHandle } from "@/ui/OpenModal";
import AddOrEdit from "./add-or-edit";
import InformationBox from "@/ui/InformationBox";
import { ContactData } from "@/types/type-data";
import Image from "next/image";
import { deleteContact } from "@/actions/contact-action";

interface ContactInfoProps {
  contactInfo: ContactData;
  onDeleteContact: () => void;
}

export default function ContactInfo({
  contactInfo,
  onDeleteContact,
}: ContactInfoProps) {
  const dialogRef = useRef<ModalHandle>(null);
  const [onEditMode, setOnEditMode] = useState(false);
  const [contactData, setContactData] = useState<ContactData>(contactInfo);
  const initialsContact = contactInfo.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  function onEditHandler(contact: ContactData) {
    setOnEditMode(true);
    if (dialogRef.current) {
      dialogRef.current.open();
    }
    setContactData(contact);
  }
  function onOpenDeleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }
  function onCloseEditHandler() {
    setOnEditMode(false);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
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
        onCloseEditHandler();
        onDeleteContact();
      },
    });
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        closeButton={false}
      />
      <OpenModal ref={dialogRef}>
        {onEditMode ? (
          <AddOrEdit
            contactDataInfo={contactData}
            onClose={onCloseEditHandler}
            addContact={false}
          />
        ) : (
          <InformationBox
            onClose={() => {
              if (dialogRef.current) {
                dialogRef.current.close();
              }
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
          <h1>{contactInfo.name}</h1>
          <div className={styles["name-info-btn"]}>
            <span onClick={() => onEditHandler(contactInfo)}>
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
          <p style={{ color: "blue" }}>{contactInfo.email}</p>
        </span>
        <span>
          <b>Phone:</b>
          <p>
            {contactInfo.zipCode}
            {contactInfo.phone}
          </p>
        </span>
      </div>
    </>
  );
}
