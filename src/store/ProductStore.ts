import { makeAutoObservable } from "mobx";
import { FilterCategories, Product, Range } from "../typing";
import { sorter, withPercent } from "../utils";
import { filter } from "lodash";

export default class ProductStore {
  private filterTypes: FilterCategories = ["categories", "size"];
  private products: Product[] = [];
  private activeTabKey: number = 0;
  private sort: string = "default";
  private filter?: { [category: string]: string };
  private priceRange?: Range;
  private productId?: number;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  get stateProducts(): Product[] {
    return this.products;
  }

  setActiveTabKey = (key: number) => (this.activeTabKey = key);

  getFilterTypes = () => this.filterTypes;

  setProducts = (products: Product[]) => {
    this.products = products.map((item) => ({
      ...item,
      price: withPercent(item.price, item.salePercent),
    }));
  };

  setSort = (sortValue: string) => (this.sort = sortValue);

  setFilter = (category: string, subCategory?: string) => {
    const filter = { ...(this.filter || {}) };
    if (filter?.[category] && !subCategory) delete filter[category];
    if (subCategory) filter[category] = subCategory;
    this.filter = filter;
  };

  setProductId = (id: number) => (this.productId = id);

  setPriceRange = (min: number, max: number) =>
    (this.priceRange = { min, max });

  private getProductWithRange = () => {
    const withFilter = this.getProductWithFilter();
    return withFilter.filter(({ price }) => {
      if (this.priceRange && this.priceRange?.max && this.priceRange?.min) {
        return price >= this.priceRange.min && price <= this.priceRange.max;
      }
      return true;
    });
  };

  private getProductWithFilter = () => {
    const withSort = this.getProductWithSort();
    if (this.filter) {
      return filter(withSort, this.filter) as Product[];
    }
    return withSort;
  };

  private getProductWithSort = () => {
    const filteredByTab = this.getProductFilteredByTab();
    if (this.sort) {
      return sorter(filteredByTab, "price", this.sort as "asc" | "dec");
    }
    return filteredByTab;
  };

  private getProductFilteredByTab = () => {
    return this.products.filter((product) => {
      if (this.activeTabKey === 0) return true;
      if (this.activeTabKey === 1) return product.newArrivals;
      if (this.activeTabKey === 2) return !!product.salePercent;
    });
  };

  get filteredProducts(): Product[] {
    return this.getProductWithRange();
  }

  get productsWithFilter(): Product[] {
    return this.getProductWithFilter();
  }
}
