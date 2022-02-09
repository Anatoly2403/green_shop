import { makeAutoObservable } from "mobx";
import { BaseApi } from "../../../api";
import { Slide } from "../../../typing";

export class SliderStore {
  public api = new BaseApi();
  public slides: Slide[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setSlides = (slides: Slide[]) => {
    this.slides = slides;
  };

  fetchSlides = async () => {
    const slides = await this.api.getData("slides");
    this.setSlides(slides.data);
  };
}
