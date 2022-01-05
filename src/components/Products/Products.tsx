import React, { FC } from 'react';
import Filter from '../ui/Filter';
import classes from './Products.module.scss';

const filterParams = [
  {
    id: '0',
    title: 'Categories',
    list: [
      {
        id: 'Categories_0',
        label: 'House Plants',
      },
      {
        id: 'Categories_1',
        label: 'Potter Plants',
      },
      {
        id: 'Categories_2',
        label: 'Seeds',
      },
    ],
  },
  {
    id: '1',
    title: 'Size',
    list: [
      {
        id: 'Size_0',
        label: 'Small',
      },
      {
        id: 'Size_1',
        label: 'Medium',
      },
      {
        id: 'Size_2',
        label: 'Large',
      },
    ],
  },
];

const rangeParams = {
  title: 'Price Range',
  min: 0,
  max: 100,
};

export const Products: FC = () => {
  const rangeApplyFilter = (min: number, max: number) => {
    console.log(min, max);
  };
  return (
    <div className={classes.products}>
      <div className={classes.products__filter}>
        <Filter
          filterProps={filterParams}
          range={{ ...rangeParams, applyRangeFilter: rangeApplyFilter }}
        />
      </div>
    </div>
  );
};
