import React, { FC } from 'react';
import { DropDown } from '../DropDown';
import classes from './Sorter.module.scss';

interface SorterProps {
  sortList: Array<{
    key: number;
    value: string;
    label: string;
  }>;
  onClick?: (value: string) => void;
}

export const Sorter: FC<SorterProps> = ({ sortList, onClick }) => {
  return (
    <div className={classes.sorter}>
      <span>Sort by:</span> <DropDown options={sortList} onSelect={onClick} />
    </div>
  );
};
