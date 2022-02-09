import { makeAutoObservable } from "mobx";
import { ModalStore } from "../features/modal/store";
import { ProductStore } from "../features/products/store";
import { SliderStore } from "../features/slider/store";

export default class AppStore {
  public readonly productStore: ProductStore;
  public readonly modalStore: ModalStore;
  public readonly sliderStore: SliderStore;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
    this.productStore = new ProductStore();
    this.modalStore = new ModalStore();
    this.sliderStore = new SliderStore();
  }
}

export const appStore = new AppStore();

export const useStore = <T extends keyof AppStore>(storeName: T) => {
  const store = appStore[storeName];  
  if (!store) console.log(`${storeName} not found`);
  return store;
};
