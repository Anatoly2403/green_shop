import { makeAutoObservable, reaction, toJS } from 'mobx';
import { FilterCategories, Product, Range, Slide } from '../typing';
import { slides, products } from '../mock';
import { withPercent } from '../utils';

export default class ProductStore {
  private filterTypes: FilterCategories = ['categories', 'size'];
  public products: Product[] = [];
  public sort: string = 'default';
  public filter?: { [category: string]: string };
  public priceRange?: Range;
  public productId?: number;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
    reaction(
      () => ({
        sort: this.sort,
        filter: this.filter,
        range: this.priceRange,
        selectedProductId: this.productId,
      }),
      (state) => console.log(toJS(state))
    );
  }

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
}
