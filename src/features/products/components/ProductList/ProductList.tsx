import React, { FC, useEffect } from "react";
import { Filter } from "../../../../components/ui/Filter";
import { Grid } from "../../../../components/ui/Grid";
import { Tab, Tabs } from "../../../../components/ui/Tabs";
import { FilterCategories, Product } from "../../../../typing";
import { maxBy, minBy, uniqBy } from "lodash";
import classes from "./ProductList.module.scss";
import { observer } from "mobx-react";
import { ProductItem } from "../ProductItem";
import { Sorter } from "../../../../components/ui/Sorter";
import { useStore } from "../../../../store";
import { useNavigate } from "react-router-dom";

const preparePriceRangeData = (products: Product[]) => ({
  min: minBy(products, "price")?.price! || 0,
  max: maxBy(products, "price")?.price || 0,
});

const sorterOptions = [
  { key: 0, value: "default", label: "Default" },
  { key: 1, label: "Descending price", value: "dec" },
  { key: 2, label: "Ascending price", value: "asc" },
];

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

export const ProductList: FC = observer(() => {
  const {
    allProducts,
    productFilterTypes: filterTypes,
    setFilter,
    setSort,
    setPriceRange,
    setProductId,
    setActiveTabKey,
    fetchProducts,
    productsWithFilter,
    filteredProducts,
  } = useStore("productStore");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductId = (id: number) => {
    setProductId(id);
    navigate(`${id}`);
  };

  return (
    <div className={classes.products}>
      <div>
        <Filter
          filterProps={prepareFilterData(filterTypes, allProducts)}
          applyFilter={setFilter}
          range={{
            ...preparePriceRangeData(productsWithFilter),
            applyRangeFilter: setPriceRange,
          }}
        />
      </div>
      <div>
        <Tabs
          onChangeTab={setActiveTabKey}
          sortComponent={<Sorter sortList={sorterOptions} onClick={setSort} />}
        >
          <Tab label="All Plants" uniqKey={0}>
            <Grid<Product>
              list={filteredProducts}
              renderComponent={ProductItem}
              onDblClick={handleProductId}
            />
          </Tab>
          <Tab label="New Arrivals" uniqKey={1}>
            <Grid<Product>
              list={filteredProducts}
              renderComponent={ProductItem}
              onDblClick={handleProductId}
            />
          </Tab>
          <Tab label="Sale" uniqKey={2}>
            <Grid<Product>
              list={filteredProducts}
              renderComponent={ProductItem}
              onDblClick={handleProductId}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
});
