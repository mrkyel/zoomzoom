import React, { useState } from "react";
import { ProductData } from "./../../lib/interface";
import styles from "./Card.module.scss";
import HeartIcon from "../HeartIcon";
import { useAtom } from "jotai";
import { heartCountAtom } from "./../../atoms/like";

interface CardProps {
  product: ProductData;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const {
    representativeImageUrl,
    categoryName,
    tourTime,
    title,
    ratings,
    reviewTotal,
    displayLocalPrice,
    displayPrice,
  } = product;

  const [heartCount, setHeartCount] = useAtom(heartCountAtom);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick: React.MouseEventHandler = () => {
    if (isHeartFilled) {
      setHeartCount(prevCount => prevCount - 1);
    } else {
      setHeartCount(prevCount => prevCount + 1);
    }
    setIsHeartFilled(prevFilled => !prevFilled);
  };

  return (
    <div className={styles.card}>
      <div className={styles["card-image"]}>
        <img
          src={representativeImageUrl}
          alt="Product Image"
          className={styles.image}
        />
        <div className={styles.heartIcon} onClick={handleHeartClick}>
          <HeartIcon filled={isHeartFilled} />
        </div>
      </div>
      <div className={styles["card-description"]}>
        <div className={styles["tour-time"]}>
          {categoryName + "+" + tourTime}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          ★ {ratings.toFixed(1)} {`(${reviewTotal}개 후기)`}
        </div>
        <div className={styles.price}>
          <div className={styles.local}>{displayLocalPrice}</div>
          <div className={styles.korean}>{`(${displayPrice})`}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
