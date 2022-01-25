import React, { FC, useEffect } from "react";
import { GreetingSlider } from "../components/GreetingSlider";
import { ProductsList } from "../components/ProductsList";
import classes from "./Home.module.scss";

export const Home: FC = () => {
  return (
    <div className={classes.home}>
      <GreetingSlider />
      <ProductsList />
    </div>
  );
};
