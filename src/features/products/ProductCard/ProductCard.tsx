import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../store";
import classes from "./ProductItem.module.scss";

interface ProductCardProps {}

export const ProductCard: FC<ProductCardProps> = () => {
  const { allProducts } = useStore("productStore");
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProducts.find((product) => product.id === Number(id));

  if (!product) {
    console.log("Selected product not found");
    return null;
  }

  return (
    <div className={classes.card}>
      <div className={classes.card__infoWrapper}>
        <div className={classes.card__img}>
          <img src={product.image} alt="product image" />
        </div>
        <div className={classes.card__info}>
          <h2>{product.name}</h2>
          <span className={classes.card__info}>{product.price}</span>
        </div>
      </div>
      <div className={classes.card__description}></div>
      <div className={classes.card__related}></div>
    </div>
  );
};
