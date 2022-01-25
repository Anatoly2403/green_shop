import { makeAutoObservable } from "mobx";
import { BaseApi } from "../api";
import ModalStore from "./ModalStore";
import ProductStore from "./ProductStore";
import SliderStore from "./SliderStore";

export default class AppStore {
  private api = new BaseApi();
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
  // if (!appStore) return console.log("AppStore not found");
  const store = appStore[storeName];

  return store;
};
