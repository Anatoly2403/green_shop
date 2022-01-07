import React, { FC } from 'react';
import classes from './GreetingSlide.module.scss';
import Button from '../../../components/ui/Button';
import { Slide } from '../../../typing';

export const GreetingSlide: FC<Slide> = ({ title, text, imgComponent }) => {
  const lastWord = title.split(' ').pop();
  const withoutLastWord = title.replace(String(lastWord), '');
  return (
    <div className={classes.slide}>
      <div className={classes.slide__textContainer}>
        <h1>Welcome to GreenShop</h1>
        <h2>
          {withoutLastWord}
          <span> {lastWord}</span>
        </h2>
        <p>{text}</p>

        {/* TODO удалить при если не понадобиться */}
        <Button
          className={classes.slide__btn}
          label='SHOP NOW'
          onClick={() => console.log('Click')}
        />
      </div>
      <div className={classes.slide__imgContainer}>
        <img src={imgComponent} alt='Slider_image' />
      </div>
    </div>
  );
};
