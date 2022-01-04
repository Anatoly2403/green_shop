import { makeAutoObservable } from 'mobx';
import { ReactElement } from 'react';

interface IModalState {
  isOpened: boolean;
  width: number;
  component: ReactElement | null;
}

const initialState = {
  isOpened: false,
  width: 600,
  component: null,
};

export default class ModalStore {
  constructor(public state: IModalState = initialState) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  createModal({
    width,
    component,
  }: {
    width?: number;
    component: ReactElement;
  }) {
    this.state.component = component;
    this.state.width = width || this.state.width;
    this.state.isOpened = true;
  }

  onClose() {
    this.state.isOpened = false;
  }
}
