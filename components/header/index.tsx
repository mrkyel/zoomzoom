import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import HeartIcon from "../../public/heart.svg";
import { useAtom } from "jotai";
import { heartCountAtom } from "./../../atoms/like";

function Header() {
  const [heartCount] = useAtom(heartCountAtom);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const formattedHeartCount = heartCount >= 10 ? "9+" : heartCount;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setVisible(!isScrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header className={`${styles.header} ${visible ? "" : styles.hidden}`}>
      <Image src="/zoomzoomtour-logo.png" alt="logo" width={75} height={50} />
      <div className={styles["heart-container"]}>
        <HeartIcon style={{ width: "25px", height: "25px" }} />
        <div className={styles["heart-count"]}>{formattedHeartCount}</div>
      </div>
    </header>
  );
}

export default Header;
