import { makeAutoObservable, reaction, toJS } from 'mobx';
import { Product, Range, Slide } from '../typing';
import { slides, products } from '../mock';

const initialStore = {
  products: [],
  slides: [],
};

export default class HomePageStore {
  state: {
    products: Product[];
    slides: Slide[];
    sort?: string;
    filter?: {
      [key: string]: string | null;
    };
    range?: Range;
    selectedProductId?: number;
  } = initialStore;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
    reaction(
      () => ({
        sort: this.state.sort,
        filter: this.state.filter,
        range: this.state.range,
        selectedProductId: this.state.selectedProductId,
      }),
      (state) => console.log(toJS(state))
    );
  }

  setProducts = (products: Product[]) => {
    this.state.products = products;
  };

  setSlides = (slides: Slide[]) => {
    this.state.slides = slides;
  };

  setSort = (value: string) => {
    if (value === 'default') {
      this.state.sort = undefined;
    }
    this.state.sort = value;
  };

  setFilter = (filter: string | null, category: string) => {
    this.state.filter = {
      ...(this.state.filter || {}),
      [category]: filter,
    };
  };

  selectProduct = (id: number) => {
    this.state.selectedProductId = id;
  };

  setRange = (min: number, max: number) => {
    this.state.range = {
      min,
      max,
    };
  };

  init = () => {
    this.setProducts(products);
    this.setSlides(slides);
  };
}
