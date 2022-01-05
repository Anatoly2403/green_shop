import React, { FC, useEffect, useState } from 'react';
import classes from './Filter.module.scss';
import cn from 'classnames';
import { Range, RangeProps } from '../Range';

interface FilterProps {
  filterProps: FilterParams[];
  range?: RangeProps;
  applyFilter?: (filter: string, category: string) => void;
}

interface State {
  [key: string]: number | null;
}

interface FilterItem {
  id: number;
  label: string;
}

interface FilterParams {
  id: number;
  title: string;
  list: FilterItem[];
}

const Filter: FC<FilterProps> = ({ filterProps, range, applyFilter }) => {
  const [active, setActive] = useState<State>({});

  useEffect(() => {
    filterProps.forEach(({ title }) =>
      setActive((prev) => ({ ...prev, [title]: null }))
    );
  }, [filterProps]);

  const handleFilter = (id: number, key: string, category: string) => {
    setActive({ ...active, [category]: id });
    if (applyFilter) applyFilter(key, category);
  };

  return (
    <div className={classes.filter}>
      {filterProps.map((item) => (
        <div key={item.id} className={classes.filter__param}>
          <div className={classes.filter__title}>{item.title}</div>
          <ul className={classes.filter__paramList}>
            {item.list.map(({ id, label }) => (
              <li
                key={id}
                className={cn(
                  active[item.title] === id && classes.filter__paramList_active
                )}
                onClick={() => handleFilter(id, label, item.title)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {range && <Range {...range} />}
    </div>
  );
};

export default Filter;
