import Image from "next/image";
import React from "react";
import styles from "./Header.module.scss";
import HeartIcon from "../../public/heart.svg";
import { useAtom } from "jotai";
import { heartCountAtom } from "./../../atoms/like";

function Header() {
  const [heartCount] = useAtom(heartCountAtom);

  return (
    <header className={styles.header}>
      <Image src="/zoomzoomtour-logo.png" alt="logo" width={75} height={50} />
      <div className={styles["heart-container"]}>
        <HeartIcon style={{ width: "25px", height: "25px" }} />
        <div className={styles["heart-count"]}>{heartCount}</div>
      </div>
    </header>
  );
}

export default Header;
