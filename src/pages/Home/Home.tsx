import React, { FC, useEffect } from "react";
import { GreetingSlider } from "../../features/sliders/GreetingSlider";
import { ProductList } from "../../features/products/ProductList";
import classes from "./Home.module.scss";

export const Home: FC = () => {
  return (
    <div className={classes.home}>
      <GreetingSlider />
      <ProductList />
    </div>
  );
};
