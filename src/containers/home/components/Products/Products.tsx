import React, { FC, useEffect, useMemo } from 'react';
import { Filter } from '../../../../components/ui/Filter';
import { Grid } from '../../../../components/ui/Grid';
import { Tab, Tabs } from '../../../../components/ui/Tabs';
import { FilterCategories, Product } from '../../../../typing';
import { filter as lodashFilter, maxBy, minBy, uniqBy } from 'lodash';
import classes from './Products.module.scss';
import { sorter } from '../../../../utils';
import { observer } from 'mobx-react';
import { ProductItem } from '../ProductItem';
import { sorterOptions } from '../../../../mock';
import { Sorter } from '../../../../components/ui/Sorter';
import { productStore as store } from '../../../../store';
import { products as mockProducts } from '../../../../mock/';

const preparePriceRangeData = (products: Product[]) => ({
  min: minBy(products, 'price')?.price! || 0,
  max: maxBy(products, 'price')?.price || 0,
});

const prepareFilterData = (
  filterTypes: FilterCategories,
  products: Product[]
) => {
  return filterTypes.map((item, i) => ({
    id: i,
    title: item,
    list: uniqBy(products, item)
      .map((product) => product[item])
      .map((filter, i) => ({ id: i, label: filter })),
  }));
};

export const Products: FC = observer(() => {
  const {
    products,
    sort,
    filter,
    priceRange,
    setFilter,
    setSort,
    setPriceRange,
    setProductId,
    setProducts,
  } = store;

  const filterTypes = store.getFilterTypes();

  useEffect(() => setProducts(mockProducts), []);

  const filteredProducts = useMemo(() => {
    const withSort = !sort
      ? products
      : sorter(products, 'price', sort as 'asc' | 'dec');

    const withRange = !(priceRange?.max && priceRange?.min)
      ? withSort
      : lodashFilter(
          withSort,
          ({ price }) => price >= priceRange.min && price <= priceRange.max
        );

    const withFilter = !filter
      ? withRange
      : (lodashFilter(withRange, filter) as Product[]);

    return withFilter;
  }, [products, sort, priceRange, filter]);

  return (
    <div className={classes.products}>
      <div>
        <Filter
          filterProps={prepareFilterData(filterTypes, products)}
          applyFilter={setFilter}
          range={{
            ...preparePriceRangeData(filteredProducts),
            applyRangeFilter: setPriceRange,
          }}
        />
      </div>
      <div>
        <Tabs
          onChangeTab={(key) => console.log(key)}
          sortComponent={<Sorter sortList={sorterOptions} onClick={setSort} />}
        >
          <Tab label='All Plants' uniqKey={0}>
            <Grid<Product>
              list={filteredProducts}
              renderComponent={ProductItem}
              onClick={setProductId}
            />
          </Tab>
          <Tab label='New Arrivals' uniqKey={1}>
            <Grid<Product>
              list={lodashFilter(filteredProducts, 'newArrivals')}
              renderComponent={ProductItem}
              onClick={setProductId}
            />
          </Tab>
          <Tab label='Sale' uniqKey={2}>
            <Grid<Product>
              list={lodashFilter(
                filteredProducts,
                ({ salePercent }) => !!salePercent
              )}
              renderComponent={ProductItem}
              onClick={setProductId}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
});
