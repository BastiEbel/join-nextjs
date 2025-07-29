"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

import styles from "./summary-container.module.css";

type ContainerProps = {
  width: string;
  image?: string | StaticImageData;
  amount: number;
  description: string;
  date?: string;
  title?: string;
  className: string;
};

export default function SummaryContainer({
  image,
  amount,
  description,
  date,
  title,
  width,
}: ContainerProps) {
  const [changeImage, setChangeImage] = useState(image);

  function onChangeImage() {
    if (typeof image === "string") {
      const lastSegment = image.split("/").pop();
      if (lastSegment === "pencilwhite.png") {
        setChangeImage("/images/pencilblack.png");
      } else if (lastSegment === "hookwhite.png") {
        setChangeImage("/images/hookblack.png");
      }
    }
  }

  function onMouseLeaveHandler() {
    setChangeImage(image);
  }
  return (
    <div
      onMouseLeave={onMouseLeaveHandler}
      onMouseOver={onChangeImage}
      style={{ width: width }}
      className={styles["summary-item"]}
    >
      {image && (
        <div
          style={
            description === "Urgent" ? { background: "#FF3D00" } : undefined
          }
          className={styles["summary-image"]}
        >
          {changeImage && (
            <Image
              width={60}
              height={60}
              priority
              style={date ? { width: "34px", height: "25px" } : undefined}
              src={changeImage}
              alt={description}
            />
          )}
        </div>
      )}
      <div className={styles["summary-content"]}>
        <p className={styles["amount"]}>{amount}</p>
        <p className={styles["description"]}>{description}</p>
      </div>
      {date && (
        <>
          <div className={styles["spacer"]}></div>
          <div className={styles["summary-content"]}>
            <p className={styles["dateTime"]}>{date}</p>
            <p className={styles["dateTimeFinish"]}>{title}</p>
          </div>
        </>
      )}
    </div>
  );
}
