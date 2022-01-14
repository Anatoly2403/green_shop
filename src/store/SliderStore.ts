import { makeAutoObservable } from 'mobx';
import { Slide } from '../typing';

export default class SliderStore {
  public slides: Slide[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setSlides = (slides: Slide[]) => {
    this.slides = slides;
  };
}
