import React, { FC, useEffect, useMemo } from 'react';
import { filter as lodashFilter, maxBy, minBy, uniqBy } from 'lodash';
import { GreetingSlide } from '../../features/slides/GreetingSlide';
import { Slider } from '../../components/ui/Slider';
import classes from './Home.module.scss';
import { FilterCategories, Product, Slide } from '../../typing';
import { observer } from 'mobx-react';
import { homePageStore } from '../../store';
import { Filter } from '../../components/ui/Filter';
import { Tab, Tabs } from '../../components/ui/Tabs';
import { Sorter } from '../../components/ui/Sorter';
import { Grid } from '../../components/ui/Grid';
import { ProductCard } from '../../components/ProductCard';
import { sorterOptions } from '../../mock';
import { sorter, withPercent } from '../../utils';

const filterTypes: FilterCategories = ['categories', 'size'];

const prepareSlides = (meta: Slide[]) =>
  meta.map((item) => ({ id: item.id, elem: <GreetingSlide {...item} /> }));

export const Home: FC = observer(() => {
  const { state, setFilter, setSort, setRange, selectProduct, init } =
    homePageStore;

  const { products, slides, sort, filter, range } = state;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), []);

  const withSale = useMemo(
    () =>
      products.map((item) => ({
        ...item,
        price: withPercent(item.price, item.salePercent),
      })),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const sorted = !sort
      ? withSale
      : sorter(withSale, 'price', sort as 'asc' | 'dec');

    const ranged = !(range?.max && range?.min)
      ? sorted
      : lodashFilter(
          sorted,
          (item) => item.price >= range.min && item.price <= range.max
        );

    return ranged;
  }, [withSale, sort, range]);

  const filterData = useMemo(
    () =>
      filterTypes.map((item, i) => ({
        id: i,
        title: item,
        list: uniqBy(products, item)
          .map((product) => product[item])
          .map((filter, i) => ({ id: i, label: filter })),
      })),
    [products]
  );

  const priceRangeData = useMemo(
    () => ({
      min: minBy(withSale, 'price')?.price! || 0,
      max: maxBy(withSale, 'price')?.price || 0,
    }),
    [withSale]
  );

  return (
    <div className={classes.home}>
      <div className={classes.home__slider}>
        {slides && <Slider slides={prepareSlides(slides)} autoScroll />}
      </div>
      <div className={classes.home__products}>
        <div>
          <Filter
            filterProps={filterData}
            applyFilter={setFilter}
            range={{ ...priceRangeData, applyRangeFilter: setRange }}
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
                renderComponent={ProductCard}
                onClick={selectProduct}
              />
            </Tab>
            <Tab label='New Arrivals' uniqKey={1}>
              <Grid<Product>
                list={lodashFilter(filteredProducts, 'newArrivals')}
                renderComponent={ProductCard}
                onClick={selectProduct}
              />
            </Tab>
            <Tab label='Sale' uniqKey={2}>
              <Grid<Product>
                list={lodashFilter(
                  filteredProducts,
                  ({ salePercent }) => !!salePercent
                )}
                renderComponent={ProductCard}
                onClick={selectProduct}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
});
