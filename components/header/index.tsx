import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Header.module.scss";
import HeartIcon from "../../public/heart.svg";
import { useAtom } from "jotai";
import { heartCountAtom } from "../../atoms/wishCheck";

const Header: React.FC = () => {
  const [heartCount] = useAtom(heartCountAtom);
  const [visible, setVisible] = useState(true);
  const prevScrollPos = useRef(0);

  const formattedHeartCount = heartCount >= 10 ? "9+" : heartCount;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < prevScrollPos.current);
      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [heartCount]);

  return (
    <header className={`${styles.header} ${!visible && styles.hidden}`}>
      <Image src="/zoomzoomtour-logo.png" alt="logo" width={75} height={50} />
      <div className={styles["heart-container"]}>
        <HeartIcon style={{ width: "25px", height: "25px" }} />
        {heartCount > 0 && (
          <div className={styles["heart-count"]}>{formattedHeartCount}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
