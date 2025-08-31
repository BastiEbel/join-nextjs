"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MultiValue, SingleValue } from "react-select";

import urgentWhite from "@/public/images/urgentwhite.png";
import mediumWhite from "@/public/images/mediumwhite.png";
import lowWhite from "@/public/images/lowwhite.png";
import hoverclear from "@/public/images/hoverclear.png";
import clear from "@/public/images/clear.png";
import check from "@/public/images/check.png";

import styles from "./task-form.module.css";
import Image from "next/image";

import { btnStyling } from "@/constants/button-styling";
import OpenModal, { ModalHandle } from "@/ui/OpenModal";
import Button from "@/ui/Button";
import SelectBox from "@/ui/SelectBox";
import Input from "@/ui/Input";
import AddCategory from "./add-category";
import { getCategories } from "@/actions/task-action";
import { getAllContacts } from "@/actions/get-data";
import { ContactData } from "@/types/type-data";

type TaskFormProps = {
  onClose?: () => void;
};

export default function TaskForm({ onClose }: TaskFormProps) {
  const [changeStyling, setChangeStyling] = useState(btnStyling);
  const dialogRef = useRef<ModalHandle>(null);
  const [showMsg, setShowMsg] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [category, setCategory] = useState<{ id: string; name: string }[]>([]);
  const [contact, setContact] = useState<ContactData[]>([]);

  const onChangeBtnStyle = useCallback((id: string) => {
    setChangeStyling((prev) =>
      prev.map((btnStyle) => {
        if (id === btnStyle.name) {
          if (btnStyle.name === "Urgent") {
            return {
              ...btnStyle,
              bgColor: "#FF3D00",
              color: "#ffffff",
              image: urgentWhite,
            };
          } else if (btnStyle.name === "Medium") {
            return {
              ...btnStyle,
              bgColor: "#FFA800",
              color: "#ffffff",
              image: mediumWhite,
            };
          } else if (btnStyle.name === "Low") {
            return {
              ...btnStyle,
              bgColor: "#7AE229",
              color: "#ffffff",
              image: lowWhite,
            };
          }
        }
        return {
          ...btnStyle,
          bgColor: "#ffffff",
          color: "#000000",
          image:
            btnStyling.find((b) => b.name === btnStyle.name)?.image ||
            btnStyle.image,
        };
      })
    );
  }, []);

  const fetchCategories = useCallback(async () => {
    const categories = await getCategories();
    setCategory(
      Array.isArray(categories.categories) ? categories.categories : []
    );
  }, []);

  useEffect(() => {
    fetchCategories();

    async function fetchContacts() {
      const contacts = await getAllContacts();

      setContact(Array.isArray(contacts) ? contacts : []);
    }

    fetchCategories();
    fetchContacts();
  }, [fetchCategories]);

  function onOpenCategoryHandler() {
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }

  function onCloseCategoryHandler() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    fetchCategories();
  }

  function onChangeContactHandler(
    e:
      | MultiValue<{ value: string | undefined; label: string }>
      | SingleValue<{ value: string | undefined; label: string }>
  ) {
    let getValue = [];
    if (Array.isArray(e) && e.length > 0) {
      e.map((item) => ({ value: item.value, label: item.label })).forEach(
        (item) => getValue.push(item)
      );
      setShowMsg(true);
      return;
    } else {
      getValue = [];
      setShowMsg(false);
    }
  }

  function onChangeCategoryHandler(
    e:
      | MultiValue<{ value: string | undefined; label: string }>
      | SingleValue<{ value: string | undefined; label: string }>
  ) {
    if (e && !Array.isArray(e)) {
      const singleValue = e as { value: string | undefined; label: string };
      console.log("Selected category:", singleValue);
    }
  }

  function onClearHandler() {
    onClearDataHandler();
    /* if (onClose) {
      setTimeout(() => {
        onClose();
      }, 100);
    } */
  }

  function onClearDataHandler() {
    onClose?.();
    setChangeStyling(btnStyling);
    setShowMsg(false);
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        <AddCategory onClose={onCloseCategoryHandler} />
      </OpenModal>
      <form id="task" className={styles["form-addTask"]} action="post">
        <main className={styles["container-task"]}>
          <div className={styles["container-left"]}>
            <div>
              <Input
                name="title"
                className={styles["input"]}
                required
                type="text"
                placeholder="Enter a title"
                labelText={
                  <>
                    Title<span style={{ color: "red" }}>*</span>
                  </>
                }
              />
            </div>
            <div>
              <Input
                name="description"
                className={styles["textArea"]}
                labelText="Description"
                textArea={true}
                required={false}
                type="text"
                placeholder="Enter a description"
              />
            </div>
            <div>
              <label
                id="contacts"
                style={{ fontSize: "20px", fontWeight: "400" }}
              >
                Assigned to
              </label>
              <SelectBox
                id="contacts"
                instanceId="contacts-select"
                placeholder="Select contacts to assign"
                isMulti={true}
                isSearchable={true}
                noOptionsMessage={() => "No contacts found"}
                onChange={onChangeContactHandler}
                options={contact.map((contact) => ({
                  value: contact.id,
                  label: contact.name,
                }))}
              />
              {showMsg && (
                <p style={{ color: "lightred" }}>
                  You can select more then one contact
                </p>
              )}
            </div>
          </div>
          <div className={styles["spacer-addTask"]}></div>
          <div className={styles["priority-section"]}>
            <div>
              <Input
                name="dueDate"
                className={styles["selectDate"]}
                required={true}
                type="date"
                placeholder="dd/mm/yyyy"
                labelText={
                  <>
                    Due date<span style={{ color: "red" }}>*</span>
                  </>
                }
              />
            </div>
            <div>
              <label className={styles["title-prio"]}>Prio</label>
              <div className={styles["btn-group"]}>
                {changeStyling.map((btnItem) => (
                  <Button
                    type="button"
                    onClick={() => onChangeBtnStyle(btnItem.name)}
                    key={btnItem.name}
                    style={{
                      background: btnItem.bgColor,
                      color: btnItem.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={styles["btn-prio"]}
                  >
                    <Image
                      className="img-prio"
                      priority
                      src={btnItem.image}
                      alt={btnItem.name}
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <label
                    style={{ fontSize: "20px", fontWeight: "400" }}
                    id="category"
                  >
                    Category
                  </label>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <span
                  onClick={onOpenCategoryHandler}
                  className={styles["add-category-btn"]}
                >
                  Add Category
                </span>
              </div>
              <SelectBox
                id="category-select"
                instanceId="category-select"
                isSearchable={false}
                options={category.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                /* value={category || null} */
                placeholder="Select task category"
                onChange={onChangeCategoryHandler}
                noOptionsMessage={() => "No categories found"}
              />
            </div>
          </div>
        </main>
        <div className={styles["form-footer"]}>
          <label>
            <span>*</span>This field is required
          </label>
          <div className={styles["submitting-btn"]}>
            <Button
              mouseOver={() => setIsHovered(true)}
              mouseLeave={() => setIsHovered(false)}
              onClick={onClearHandler}
              className={styles["clear-btn"]}
            >
              Clear
              <Image
                priority
                width={24}
                height={24}
                src={isHovered ? hoverclear : clear}
                alt="X"
              />
            </Button>
            <Button className={styles["create-btn"]}>
              Create Task
              <Image priority width={24} height={24} src={check} alt="X" />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
