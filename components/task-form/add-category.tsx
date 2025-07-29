"use client";

import Input from "@/ui/Input";
import styles from "./add-category.module.css";

import { useState } from "react";
import Button from "@/ui/Button";

type AddCategoryProps = {
  onClose: () => void;
};

type Category = {
  name: string;
};

export default function AddCategory({ onClose }: AddCategoryProps) {
  const [categoryName, setCategoryName] = useState<Category>({ name: "" });
  function onAddCategoryHandler() {
    setCategoryName({ name: "" });
    onClose();
  }
  return (
    <div className={styles.containerCategoryAdd}>
      <div className={styles.containerTitle}>
        <h2 className={styles.title}>Add Category</h2>
        <div className={styles.spacer}></div>
      </div>
      <div className={styles.containerCategoryInput}>
        <label className={styles.labelCategory}>Category Name:</label>
        <Input
          onChange={(e) => setCategoryName({ name: e.target.value })}
          value={categoryName.name}
          className={styles.categoryInput}
          type="text"
          required={false}
          placeholder="examples: Sales, Marketing"
        />
      </div>
      <div className={styles.containerBtn}>
        <Button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={onAddCategoryHandler}
          className={styles.addCategoryBtn}
        >
          Add Category
        </Button>
      </div>
    </div>
  );
}
