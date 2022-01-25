import { makeAutoObservable } from "mobx";
import { ReactElement } from "react";

export default class ModalStore {
  public isOpened: boolean = false;
  public width: number = 600;
  public component: ReactElement | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  createModal({
    width,
    component,
  }: {
    width?: number;
    component: ReactElement;
  }) {
    this.component = component;
    this.width = width || this.width;
    this.isOpened = true;
  }

  onClose() {
    this.isOpened = false;
  }
}
