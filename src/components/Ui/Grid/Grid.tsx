import React, { ReactElement } from "react";
import classes from "./Grid.module.scss";

interface GridProps<T> {
  list: T[];
  renderComponent: React.FC<T>;
}

export const Grid = <T extends { id: number }>({
  list,
  renderComponent: Component,
}: GridProps<T>): ReactElement => {
  return (
    <div className={classes.grid}>
      {list.map((item) => (
        <React.Fragment key={item.id}>
          <Component {...item} />
        </React.Fragment>
      ))}
    </div>
  );
};
