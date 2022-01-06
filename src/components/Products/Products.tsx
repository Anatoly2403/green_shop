import { filter, maxBy, minBy, uniqBy } from 'lodash';
import React, { FC, useMemo } from 'react';
import { ProductList } from '../ProductList';
import Filter from '../ui/Filter';
import { Sorter } from '../ui/Sorter';
import { Tab, Tabs } from '../ui/Tabs';
import classes from './Products.module.scss';

const products = [
  {
    id: 0,
    name: 'Barberton Daisy',
    price: 119,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'Potter Plants',
    size: 'small',
    image: undefined,
    newArrivals: true,
    salePercent: 0,
  },
  {
    id: 1,
    name: 'Angel Wing Begonia',
    price: 169,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'House Plants',
    size: 'medium',
    image: undefined,
    newArrivals: false,
    salePercent: 13,
  },
  {
    id: 2,
    name: 'African Violet',
    price: 150,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'Seeds',
    size: 'large',
    image: undefined,
    newArrivals: true,
    salePercent: 0,
  },
  {
    id: 3,
    name: 'Beach Spider Lily',
    price: 130,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!. ',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'Potter Plants',
    size: 'large',
    image: undefined,
    newArrivals: false,
    salePercent: 23,
  },
  {
    id: 4,
    name: 'Blushing Bromeliad',
    price: 183,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!. ',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'Potter Plants',
    size: 'medium',
    image: undefined,
    newArrivals: false,
    salePercent: 17,
  },
  {
    id: 5,
    name: 'Aluminum Plant',
    price: 138,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!. ',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'Potter Plants',
    size: 'small',
    image: undefined,
    newArrivals: true,
    salePercent: 0,
  },
];

const filterTypes: ['categories', 'size'] = ['categories', 'size'];

export const Products: FC = () => {
  const rangeApplyFilter = (min: number, max: number) => {
    console.log(min, max);
  };
  const applyFilter = (filter: string | null, category: string) => {
    console.log(filter, category);
  };

  const onProductClick = (id: number) => {
    console.log(id);
  };

  const rangeParams = useMemo(
    () => ({
      title: 'Price Range',
      min: minBy(products, 'price')?.price! || 0,
      max: maxBy(products, 'price')?.price || 0,
    }),
    []
  );

  const filterParams = useMemo(
    () =>
      filterTypes.map((item, i) => ({
        id: i,
        title: item,
        list: uniqBy(products, item)
          .map((product) => product[item])
          .map((filter, i) => ({ id: i, label: filter })),
      })),
    []
  );

  return (
    <div className={classes.products}>
      <div className={classes.products__filter}>
        <Filter
          filterProps={filterParams}
          applyFilter={applyFilter}
          range={{ ...rangeParams, applyRangeFilter: rangeApplyFilter }}
        />
      </div>
      <div className={classes.products__content}>
        <Tabs
          sortComponent={
            <Sorter
              sortList={[
                { key: 0, label: 'Descending price', value: 'dec' },
                { key: 1, label: 'Ascending price', value: 'asc' },
              ]}
            />
          }
        >
          <Tab label='All Plants' uniqKey={0}>
            <ProductList products={products} onClick={onProductClick} />
          </Tab>
          <Tab label='New Arrivals' uniqKey={1}>
            <ProductList
              products={filter(products, 'newArrivals')}
              onClick={onProductClick}
            />
          </Tab>
          <Tab label='Sale' uniqKey={2}>
            <ProductList
              products={filter(products, ({ salePercent }) => !!salePercent)}
              onClick={onProductClick}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
