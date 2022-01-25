import React, { ReactElement } from 'react';
import classes from './Grid.module.scss';

interface GridProps<T> {
  list: T[];
  onDblClick?: (id: number) => void;
  renderComponent: React.FC<T>;
}

export const Grid = <T extends { id: number }>({
  list,
  onDblClick,
  renderComponent: Component,
}: GridProps<T>): ReactElement => {
  return (
    <div className={classes.grid}>
      {list.map((item) => (
        <React.Fragment key={item.id}>
          <Component {...item} onDblClick={onDblClick} />
        </React.Fragment>
      ))}
    </div>
  );
};
