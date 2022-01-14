import React, { ReactChild, useEffect, useRef, useState } from 'react';
import classes from './Slider.module.scss';
import cn from 'classnames';

interface SliderProps {
  children: ReactChild[];
  autoScroll?: boolean;
}

export const Slider = ({ autoScroll = false, children }: SliderProps) => {
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
        () =>
          setActive((prev) => (prev === children.length - 1 ? 0 : prev + 1)),
        5000
      );
    }
    return () => clearInterval(intervalId);
  }, [active, autoScroll, children]);

  return (
    <div className={classes.slider__wrapper}>
      <div ref={slider} className={classes.slider}>
        <ul ref={track} className={classes.slider__track}>
          {children &&
            children.map((item) => (
              <li
                key={(item as { key: number }).key}
                className={classes.slider__item}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div className={classes.slider__dots}>
        {children &&
          children.map((item, i) => (
            <div
              key={(item as { key: number }).key}
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
