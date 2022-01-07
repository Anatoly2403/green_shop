import React, { ReactElement } from 'react';
import classes from './Grid.module.scss';

interface GridProps<T> {
  list: T[];
  onClick?: (id: number) => void;
  renderComponent: React.FC<T>;
}

export const Grid = <T extends { id: number }>({
  list,
  onClick,
  renderComponent: Component,
}: GridProps<T>): ReactElement => {
  return (
    <div className={classes.grid}>
      {list.map((item) => (
        <React.Fragment key={item.id}>
          <Component {...item} onClick={onClick} />
        </React.Fragment>
      ))}
    </div>
  );
};
