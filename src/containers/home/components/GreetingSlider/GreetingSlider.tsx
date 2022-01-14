import React, { FC, useEffect, useMemo } from 'react';
import classes from './GreetingSlider.module.scss';
import Button from '../../../../components/ui/Button';
import { Slider } from '../../../../components/ui/Slider';
import { observer } from 'mobx-react-lite';
import { sliderStore } from '../../../../store';
import { slides as mockSlides } from '../../../../mock';

export const GreetingSlider: FC = observer(() => {
  const { slides, setSlides } = sliderStore;

  useEffect(() => setSlides(mockSlides), []);

  const slidesComponents = slides.map(({ id, title, text, imgComponent }) => {
    const lastWord = title.split(' ').pop();
    const withoutLastWord = title.replace(String(lastWord), '');
    return (
      <div key={id} className={classes.slide}>
        <div className={classes.slide__textContainer}>
          <h1>Welcome to GreenShop</h1>
          <h2>
            {withoutLastWord}
            <span> {lastWord}</span>
          </h2>
          <p>{text}</p>
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
  });

  return (
    <div className={classes.greetingSlider}>
      <Slider autoScroll>{slidesComponents}</Slider>
    </div>
  );
});
