import { makeAutoObservable } from "mobx";
import { ModalStore } from "../features/modal/store";
import { ProductStore } from "../features/products/store";
import { SliderStore } from "../features/slider/store";

export default class AppStore {
  public readonly productStore: ProductStore;
  public readonly modalStore: ModalStore;
  public readonly sliderStore: SliderStore;

  constructor(
    productStore: ProductStore,
    modalStore: ModalStore,
    sliderStore: SliderStore
  ) {
    makeAutoObservable(this, {}, { deep: true });
    this.productStore = productStore;
    this.modalStore = modalStore;
    this.sliderStore = sliderStore;
  }
}

export const appStore = new AppStore(
  new ProductStore(),
  new ModalStore(),
  new SliderStore()
);

export const useStore = <T extends keyof AppStore>(storeName: T) => {
  const store = appStore[storeName];
  if (!store) console.log(`${storeName} not found`);
  return store;
};
