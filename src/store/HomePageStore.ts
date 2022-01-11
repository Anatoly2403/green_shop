import { makeAutoObservable, reaction, toJS } from 'mobx';
import { FilterCategories, Product, Range, Slide } from '../typing';
import { slides, products } from '../mock';
import { withPercent } from '../utils';
import { maxBy, minBy, uniqBy } from 'lodash';

const initialStore = {
  products: [],
  slides: [],
  sort: 'default',
};

type A = 'salePercent' | 'newArrivals' | 'price' | 'id';

export default class HomePageStore {
  private filterTypes = ['categories', 'size'];
  state: {
    products: Product[];
    slides: Slide[];
    sort: string;
    filter?: { [category: string]: string };
    priceRange?: Range;
    productId?: number;
  } = initialStore;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
    reaction(
      () => ({
        sort: this.state.sort,
        filter: this.state.filter,
        range: this.state.priceRange,
        selectedProductId: this.state.productId,
      }),
      (state) => console.log(toJS(state))
    );
  }

  setProducts = (products: Product[]) => {
    this.state.products = products.map((item) => ({
      ...item,
      price: withPercent(item.price, item.salePercent),
    }));
  };

  setSlides = (slides: Slide[]) => (this.state.slides = slides);

  setSort = (sortValue: string) => (this.state.sort = sortValue);

  setFilter = (category: string, subCategory?: string) => {
    const filter = { ...(this.state.filter || {}) };
    if (filter?.[category] && !subCategory) delete filter[category];
    if (subCategory) filter[category] = subCategory;
    this.state.filter = filter;
  };

  setProductId = (id: number) => (this.state.productId = id);

  setPriceRange = (min: number, max: number) =>
    (this.state.priceRange = { min, max });

  preparePriceRangeData = () => ({
    min: minBy(products, 'price')?.price! || 0,
    max: maxBy(products, 'price')?.price || 0,
  });

  prepareFilterData = () => {
    return this.filterTypes.map((item, i) => ({
      id: i,
      title: item,
      list: uniqBy(products, item)
        .map((product) => product[item as keyof Omit<Product, A>])
        .map((filter, i) => ({ id: i, label: filter })),
    }));
  };

  init = () => {
    this.setProducts(products);
    this.setSlides(slides);
  };

  setFilterTypes = () => this.filterTypes.push('name');
}
