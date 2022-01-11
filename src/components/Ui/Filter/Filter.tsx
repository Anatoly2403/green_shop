import React, { FC, useState } from 'react';
import classes from './Filter.module.scss';
import cn from 'classnames';
import { Range, RangeProps } from '../Range';
import { FilterParams } from '../../../typing';

interface FilterProps {
  filterProps: FilterParams[];
  range?: RangeProps;
  applyFilter?: (category: string, subCategory?: string) => void;
}

interface State {
  [key: string]: number | null;
}

export const Filter: FC<FilterProps> = ({
  filterProps,
  range,
  applyFilter,
}) => {
  const [active, setActive] = useState<State>({});

  const handleFilter = (id: number, key: string, category: string) => {
    if (id !== active[category]) {
      setActive({ ...active, [category]: id });
      if (applyFilter) applyFilter(category, key);
    } else {
      setActive({ ...active, [category]: null });
      if (applyFilter) applyFilter(category);
    }
  };

  return (
    <div className={classes.filter}>
      {filterProps.map((item) => (
        <div key={item.id} className={classes.filter__param}>
          <div className={classes.filter__title}>{item.title}</div>
          <ul className={classes.filter__paramList}>
            {item.list.map(({ id, label }) => (
              <li key={id}>
                <span
                  className={cn({
                    [classes.filter__paramList_active]:
                      active[item.title] === id,
                  })}
                  onClick={() => handleFilter(id, label, item.title)}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {!!range?.min && !!range.max && <Range {...range} />}
    </div>
  );
};
