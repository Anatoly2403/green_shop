import React, { FC } from "react";
import { GreetingSlide } from "../../features/slider/components/slides/GreetingSlide";
import { ProductList } from "../../features/products/components/ProductList";
import classes from "./HomePage.module.scss";
import { MainSlider } from "../../features/slider/components/MainSlider";

export const HomePage: FC = () => {
  return (
    <div className={classes.home}>
      <MainSlider Slide={GreetingSlide} />
      <ProductList />
    </div>
  );
};
