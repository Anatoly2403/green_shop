import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classes from './Range.module.scss';
import cn from 'classnames';
import { debounce } from 'lodash';
import { Range as BasicRangeProps } from '../../../typing';

export interface RangeProps extends BasicRangeProps {
  width?: number;
  applyRangeFilter?: (min: number, max: number) => void;
}

const getPercent = (currentValue: number, min: number = 0, max: number = 100) =>
  Math.round(((currentValue - min) / (max - min)) * 100);

const debouncedApplyFilter = debounce(
  (min: number, max: number, callback?: (min: number, max: number) => void) => {
    if (callback) callback(min, max);
  },
  600
);

export const Range: FC<RangeProps> = ({
  min = 0,
  max = 100,
  width = 100,
  applyRangeFilter,
}) => {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [active, setActive] = useState<string>('');
  const rangeLine = useRef<HTMLDivElement>(null);
  const minThumb = useRef<HTMLInputElement>(null);
  const maxThumb = useRef<HTMLInputElement>(null);

  const handleChangeRange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.name === 'min') {
        const value = Math.min(Number(event.target.value), maxValue - 1);
        setMinValue(value);
        debouncedApplyFilter(value, maxValue, applyRangeFilter);
      }
      if (event.target.name === 'max') {
        const value = Math.max(Number(event.target.value), minValue + 1);
        setMaxValue(value);
        debouncedApplyFilter(minValue, value, applyRangeFilter);
      }

      if (active !== event.target.name) setActive(event.target.name);
    },
    [applyRangeFilter, active, minValue, maxValue]
  );

  useEffect(() => {
    if (maxThumb.current) {
      const minPercent = getPercent(minValue, min, max);
      const maxPercent = getPercent(+maxThumb.current.value, min, max);

      if (rangeLine.current && minPercent >= 0 && maxPercent > 0) {
        rangeLine.current.style.left = `${minPercent}%`;
        rangeLine.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue, min, max]);

  useEffect(() => {
    if (minThumb.current) {
      const minPercent = getPercent(+minThumb.current.value, min, max);
      const maxPercent = getPercent(maxValue, min, max);

      if (rangeLine.current && minPercent >= 0 && maxPercent > 0) {
        rangeLine.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxValue, min, max]);

  return (
    <div className={classes.range}>
      <div className={classes.range__title}>Price Range</div>
      <div className={classes.range__sliderWrapper} style={{ width }}>
        <input
          ref={minThumb}
          type='range'
          name='min'
          min={min}
          max={max}
          value={minValue}
          className={cn(classes.range__thumb, {
            [classes.range__thumb_active]: active === 'min',
          })}
          onChange={handleChangeRange}
        />
        <input
          ref={maxThumb}
          type='range'
          name='max'
          min={min}
          max={max}
          value={maxValue}
          className={cn(classes.range__thumb, {
            [classes.range__thumb_active]: active === 'max',
          })}
          onChange={handleChangeRange}
        />

        <div className={classes.range__slider}>
          <div className={classes.range__track_outer} style={{ width }} />
          <div ref={rangeLine} className={classes.range__track_inner} />
        </div>
      </div>
      <div className={classes.range__total}>
        Price:&nbsp;
        <div>
          ${minValue} - ${maxValue}
        </div>
      </div>
    </div>
  );
};
