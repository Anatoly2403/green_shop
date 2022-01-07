import React, { FC } from 'react';
import { SorterOption } from '../../../typing';
import { DropDown } from '../DropDown';
import classes from './Sorter.module.scss';

interface SorterProps {
  sortList: SorterOption[];
  onClick?: (value: string) => void;
}

export const Sorter: FC<SorterProps> = ({ sortList, onClick }) => {
  return (
    <div className={classes.sorter}>
      <span>Sort by:</span> <DropDown options={sortList} onSelect={onClick} />
    </div>
  );
};
