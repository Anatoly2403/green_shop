import React, { FC, useEffect, useMemo } from 'react';
import { filter as lodashFilter, maxBy, minBy, uniqBy } from 'lodash';
import { GreetingSlide } from '../../../features/slides/GreetingSlide';
import { Slider } from '../../../components/ui/Slider';
import classes from './Home.module.scss';
import { FilterCategories, Product, Slide } from '../../../typing';
import { observer } from 'mobx-react';
import { homePageStore } from '../../../store';
import { Filter } from '../../../components/ui/Filter';
import { Tab, Tabs } from '../../../components/ui/Tabs';
import { Sorter } from '../../../components/ui/Sorter';
import { Grid } from '../../../components/ui/Grid';
import { ProductItem } from '../components/ProductItem';
import { sorterOptions } from '../../../mock';
import { sorter } from '../../../utils';

const prepareSlides = (meta: Slide[]) =>
  meta.map((item) => ({ id: item.id, elem: <GreetingSlide {...item} /> }));

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

export const Home: FC = observer(() => {
  const {
    state,
    setFilter,
    setSort,
    setPriceRange,
    getFilterTypes,
    setProductId,
    init,
  } = homePageStore;

  const { products, slides, sort, filter, priceRange } = state;
  const filterTypes = getFilterTypes();

  useEffect(() => init(), []);

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

  const filterProps = useMemo(
    () => prepareFilterData(filterTypes, products),
    [products, filterTypes]
  );

  const rangeProps = useMemo(
    () => preparePriceRangeData(filteredProducts),
    [filteredProducts]
  );

  return (
    <div className={classes.home}>
      <div className={classes.home__slider}>
        {slides && <Slider slides={prepareSlides(slides)} autoScroll />}
      </div>
      <div className={classes.home__products}>
        <div>
          <Filter
            filterProps={filterProps}
            applyFilter={setFilter}
            range={{
              ...rangeProps,
              applyRangeFilter: setPriceRange,
            }}
          />
        </div>
        <div>
          <Tabs
            sortComponent={
              <Sorter sortList={sorterOptions} onClick={setSort} />
            }
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
    </div>
  );
});
