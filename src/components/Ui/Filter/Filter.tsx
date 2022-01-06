import React, { FC, useEffect, useState } from 'react';
import classes from './Filter.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { Range, RangeProps } from '../Range';

interface FilterProps {
  filterProps: FilterParams[];
  range?: RangeProps;
  applyFilter?: (filter: string | null, category: string) => void;
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

const alertAnimation = {
  initial: { x: '-20px', width: 0 },
  animate: { x: '10px', width: 'auto' },
  exit: { x: '-20px', width: 0, transition: { duration: 0.6 } },
};

const alertTextAnimation = {
  initial: { opacity: 0, scaleX: 0 },
  animate: { opacity: 1, scaleX: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scaleX: 0 },
};

const Filter: FC<FilterProps> = ({ filterProps, range, applyFilter }) => {
  const [active, setActive] = useState<State>({});
  const [activeBlock, setActiveBlock] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    filterProps.forEach(({ title }) =>
      setActive((prev) => ({ ...prev, [title]: null }))
    );
  }, [filterProps]);

  const handleFilter = (id: number, key: string, category: string) => {
    if (id !== active[category]) {
      setActive({ ...active, [category]: id });
      if (applyFilter) applyFilter(key, category);
      if (showAlert) setShowAlert(false);
    } else {
      setShowAlert(!showAlert);
    }
    if (category !== activeBlock) setActiveBlock(category);
  };

  const onAlertClick = (category: string) => {
    setActive({ ...active, [category]: null });
    if (applyFilter) applyFilter(null, category);
    setShowAlert(false);
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
                <div className={classes.filter__alertWrapper}>
                  <AnimatePresence>
                    {showAlert &&
                      active[item.title] === id &&
                      activeBlock === item.title && (
                        <motion.button
                          className={classes.filter__alert}
                          {...alertAnimation}
                          transition={{ type: 'tween' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onAlertClick(item.title)}
                          onBlur={() => setShowAlert(false)}
                        >
                          <motion.span {...alertTextAnimation}>
                            Remove filter
                          </motion.span>
                        </motion.button>
                      )}
                  </AnimatePresence>
                </div>
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
