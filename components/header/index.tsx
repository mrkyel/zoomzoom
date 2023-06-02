import Image from "next/image";
import React from "react";
import styles from "./Header.module.scss";
import HeartIcon from "../../public/heart.svg";

function Header() {
  return (
    <header className={styles.header}>
      <Image src="/zoomzoomtour-logo.png" alt="logo" width={75} height={50} />
      <div className={styles["heart-container"]}>
        <HeartIcon style={{ width: "25px", height: "25px" }} />
      </div>
    </header>
  );
}

export default Header;
