import React, { FC, useState } from 'react';
import classes from './DropDown.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const dropDownAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const dropDownItemAnimation = {
  initial: { scaleY: 0, height: 0 },
  animate: { scaleY: 1, height: 'auto' },
  exit: { scaleY: 0, height: 0 },
};

interface Option {
  key: number;
  value: string;
  label: string;
}

interface DropDownProps {
  options: Option[];
  onSelect?: (value: string) => void;
}

export const DropDown: FC<DropDownProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState<string>('Default');
  const [visible, setVisible] = useState<boolean>(false);

  const handleSelect = (value: string, label: string) => {
    setSelected(label);
    if (onSelect) onSelect(value);
    setVisible(false);
  };

  return (
    <div className={classes.dropDown} onClick={() => setVisible(!visible)}>
      <span>{selected}</span>
      <AnimatePresence>
        {visible && (
          <motion.ul
            className={classes.dropDown__options}
            layoutId='underline'
            {...dropDownAnimation}
          >
            {options.map((option) => (
              <motion.li
                key={option.key}
                {...dropDownItemAnimation}
                onClick={() => handleSelect(option.value, option.label)}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
