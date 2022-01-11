import { makeAutoObservable, reaction, toJS } from 'mobx';
import { FilterCategories, Product, Range, Slide } from '../typing';
import { slides, products } from '../mock';
import { withPercent } from '../utils';

const initialStore = {
  products: [],
  slides: [],
  sort: 'default',
};

type A = 'salePercent' | 'newArrivals' | 'price' | 'id';

export default class HomePageStore {
  private filterTypes: FilterCategories = ['categories', 'size'];
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

  getFilterTypes = () => this.filterTypes;
  
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

  init = () => {
    this.setProducts(products);
    this.setSlides(slides);
  };
}
