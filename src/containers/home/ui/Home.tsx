import React, { FC } from 'react';
import { GreetingSlider } from '../components/GreetingSlider';
import { Products } from '../components/Products/Products';
import classes from './Home.module.scss';

export const Home: FC = () => {
  return (
    <div className={classes.home}>
      <GreetingSlider />
      <Products />
    </div>
  );
};
