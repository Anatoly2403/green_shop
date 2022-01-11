import React, { FC, useEffect, useMemo } from 'react';
import { filter as lodashFilter } from 'lodash';
import { GreetingSlide } from '../../features/slides/GreetingSlide';
import { Slider } from '../../components/ui/Slider';
import classes from './Home.module.scss';
import { Product, Slide } from '../../typing';
import { observer } from 'mobx-react';
import { homePageStore } from '../../store';
import { Filter } from '../../components/ui/Filter';
import { Tab, Tabs } from '../../components/ui/Tabs';
import { Sorter } from '../../components/ui/Sorter';
import { Grid } from '../../components/ui/Grid';
import { ProductCard } from '../../components/ProductCard';
import { sorterOptions } from '../../mock';
import { sorter } from '../../utils';

const prepareSlides = (meta: Slide[]) =>
  meta.map((item) => ({ id: item.id, elem: <GreetingSlide {...item} /> }));

export const Home: FC = observer(() => {
  const {
    state,
    setFilter,
    setSort,
    setPriceRange,
    setProductId,
    init,
    preparePriceRangeData,
    prepareFilterData,
    setFilterTypes,
  } = homePageStore;

  const { products, slides, sort, filter, priceRange } = state;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), []);

  const filteredProducts = useMemo(() => {
    const sorted = !sort
      ? products
      : sorter(products, 'price', sort as 'asc' | 'dec');

    const ranged = !(priceRange?.max && priceRange?.min)
      ? sorted
      : lodashFilter(
          sorted,
          ({ price }) => price >= priceRange.min && price <= priceRange.max
        );

    return ranged;
  }, [products, sort, priceRange]);

  const filterProps = useMemo(() => prepareFilterData(), [prepareFilterData]);
  const rangeProps = useMemo(
    () => preparePriceRangeData(),
    [preparePriceRangeData]
  );

  return (
    <div className={classes.home}>
      <button onClick={setFilterTypes}>+</button>
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
                renderComponent={ProductCard}
                onClick={setProductId}
              />
            </Tab>
            <Tab label='New Arrivals' uniqKey={1}>
              <Grid<Product>
                list={lodashFilter(filteredProducts, 'newArrivals')}
                renderComponent={ProductCard}
                onClick={setProductId}
              />
            </Tab>
            <Tab label='Sale' uniqKey={2}>
              <Grid<Product>
                list={lodashFilter(
                  filteredProducts,
                  ({ salePercent }) => !!salePercent
                )}
                renderComponent={ProductCard}
                onClick={setProductId}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
});
