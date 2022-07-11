import React, { FC } from 'react';
import { ReactComponent as Search } from '../../../assets/icons/Search.svg';
import classes from './SearchBtn.module.scss';

export const SearchBtn: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div className={classes.searchBtn} onClick={onClick}>
      <Search />
    </div>
  );
};
