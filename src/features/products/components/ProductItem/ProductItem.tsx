import React, { FC, useState } from "react";
import classes from "./ProductItem.module.scss";
import { ReactComponent as ImageNotFound } from "../../../../assets/icons/ImageNotFound.svg";
import { ReactComponent as Like } from "../../../../assets/icons/Like.svg";
import { ReactComponent as Cart } from "../../../../assets/icons/Cart.svg";
import { ReactComponent as Search } from "../../../../assets/icons/Search.svg";
import { motion } from "framer-motion";
import { Product } from "../../../../typing";

export interface ProductProps extends Product {
  onDblClick?: (id: number) => void;
}

export const ProductItem: FC<ProductProps> = ({
  id,
  image,
  name,
  price,
  salePercent,
  onDblClick = () => {},
}) => {
  const [over, setOver] = useState<boolean>(false);

  return (
    <div
      className={classes.product}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      onDoubleClick={() => onDblClick(id)}
    >
      <div className={classes.product__imgContainer}>
        <motion.div {...(over && { animate: { scale: 0.85, y: "-20px" } })}>
          {image ? (
            <img src={require(image)} alt="product_img" />
          ) : (
            <ImageNotFound color="#46a3584d" />
          )}
        </motion.div>

        {/* TODO добавить обработчик */}
        {over && (
          <motion.div>
            <Cart width={18} height={18} />
            <Like width={18} height={18} />
            <Search width={18} height={18} />
          </motion.div>
        )}
      </div>

      <div className={classes.product__info}>
        <div>{name}</div>
        <div>${price.toFixed(2)}</div>
      </div>

      {!!salePercent && (
        <div className={classes.product__sale}>{salePercent}% OFF</div>
      )}
    </div>
  );
};
