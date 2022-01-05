import React, { FC } from 'react';
import { Slide, SlideProps } from '../../features/slides/greetingSlides';
import Slider from '../../components/ui/Slider';
import classes from './Home.module.scss';
import { Slide as SlideType } from '../../components/ui/Slider/Slider';
import logo1 from '../../assets/images/greetingImg_1.png';
import logo2 from '../../assets/images/greetingImg_2.png';
import { Products } from '../../components/Products';

interface Meta extends SlideProps {
  id: number;
}

const slideMeta = [
  {
    id: 0,
    title: 'Let’s Make a Better Planet',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!',
    imgComponent: logo1,
  },
  {
    id: 1,
    title: 'Time for Nature',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!',
    imgComponent: logo2,
  },
  {
    id: 2,
    title: 'Keep clean & go green',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!',
    imgComponent: logo1,
  },
];

const products = [];

const prepareSlides = (meta: Meta[]): SlideType[] =>
  meta.map(({ id, ...rest }) => ({ id, elem: <Slide {...rest} /> }));

export const Home: FC = () => {
  return (
    <div className={classes.home}>
      <div className={classes.home__slider}>
        <Slider slides={prepareSlides(slideMeta)} autoScroll />
      </div>
      <div className={classes.home__shop}>
        <Products />
      </div>
    </div>
  );
};
