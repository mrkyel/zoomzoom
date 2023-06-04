import React from "react";
import { ProductData } from "./../../lib/interface";
import styles from "./Card.module.scss";
import HeartIcon from "../HeartIcon";
import { useAtom } from "jotai";
import { isHeartFilledAtom } from "../../atoms/wishCheck";
import Link from "next/link";
interface CardProps {
  product: ProductData;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const {
    id,
    representativeImageUrl,
    categoryName,
    tourTime,
    title,
    ratings,
    reviewTotal,
    displayLocalPrice,
    displayPrice,
  } = product;

  const [isHeartFilled, setIsHeartFilled] = useAtom(isHeartFilledAtom);

  const handleHeartClick: React.MouseEventHandler = () => {
    setIsHeartFilled(prevIsHeartFilled => {
      const updatedIsHeartFilled = [...prevIsHeartFilled];
      updatedIsHeartFilled[id] = !prevIsHeartFilled[id];
      return updatedIsHeartFilled;
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles["card-image"]}>
        <Link href={`/tour/${id}`} target="_blank">
          <img
            src={representativeImageUrl}
            alt="Product Image"
            className={styles.image}
          />
        </Link>
        <div className={styles.heartIcon} onClick={handleHeartClick}>
          <HeartIcon filled={isHeartFilled[id]} />
        </div>
      </div>
      <div className={styles["card-description"]}>
        <div className={styles["tour-time"]}>
          {categoryName} • {tourTime}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          ★ {ratings.toFixed(1)} ({reviewTotal}개 후기)
        </div>
        <div className={styles.price}>
          <div className={styles.local}>{displayLocalPrice}</div>
          <div className={styles.korean}>({displayPrice})</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
