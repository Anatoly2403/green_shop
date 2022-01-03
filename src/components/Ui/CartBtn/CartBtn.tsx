import React, { FC } from 'react';
import classes from './CartBtn.module.scss';
import { ReactComponent as Cart } from '../../../assets/icons/Cart.svg';

const CartBtn: FC<{ count?: number; onClick?: () => void }> = ({
  count,
  onClick,
}) => {
  return (
    <div className={classes.cartBtn} onClick={onClick}>
      <Cart />
      {count && <span className={classes.cartBtn__counter}>{count}</span>}
    </div>
  );
};

export default CartBtn;
