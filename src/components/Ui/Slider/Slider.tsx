import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import classes from './Slider.module.scss';
import cn from 'classnames';

export interface Slide {
  id: number;
  elem: ReactElement;
}

interface SliderProps {
  slides: Slide[];
  autoScroll?: boolean;
}

const Slider: FC<SliderProps> = ({ slides, autoScroll = false }) => {
  const [active, setActive] = useState<number>(0);
  const slider = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  const scrollSlider = (active: number): void => setActive(active);

  useEffect(() => {
    const width = slider.current?.offsetWidth;
    if (track.current && width) {
      track.current.style.transform = `translate(-${width * active}px)`;
    }

    let intervalId: NodeJS.Timer;

    if (autoScroll) {
      intervalId = setInterval(
        () => setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
        5000
      );
    }

    return () => clearInterval(intervalId);
  }, [active, autoScroll, slides]);

  return (
    <div className={classes.slider__wrapper}>
      <div ref={slider} className={classes.slider}>
        <ul ref={track} className={classes.slider__track}>
          {slides.map((item) => (
            <li key={item.id} className={classes.slider__item}>
              {item.elem}
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.slider__dots}>
        {slides.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              classes.slider__dot,
              active === i && classes.slider__dot_active
            )}
            onClick={() => scrollSlider(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
