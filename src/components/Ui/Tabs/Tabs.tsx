import React, { FC, ReactElement, ReactNode, useState } from 'react';
import classes from './Tabs.module.scss';
import cn from 'classnames';
import { motion } from 'framer-motion';

type Child =
  | (ReactElement & { props: { label: string; uniqKey: number } })
  | (ReactNode & { props: { label: string; uniqKey: number } });

interface TabsProps {
  children: Child[];
  activeTab?: number;
  sortComponent?: ReactElement | ReactNode;
}

export const Tab: FC<{ label: string; uniqKey: number }> = ({
  children,
  label,
  uniqKey,
}) => <>{children}</>;

export const Tabs: FC<TabsProps> = ({
  children,
  activeTab = 0,
  sortComponent,
}) => {
  const [active, setActive] = useState<number>(activeTab);

  const tabs = children.map((child) => (
    <div
      key={child.props.uniqKey}
      className={cn([
        classes.tabs__tab,
        { [classes.tabs__tab_active]: active === child.props.uniqKey },
      ])}
      onClick={() => setActive(child.props.uniqKey)}
    >
      {child.props.label}
    </div>
  ));

  const content = children.filter((child) => active === child.props.uniqKey);

  return (
    <div className={classes.tabs}>
      <div className={classes.tabs__header}>
        <div className={classes.tabs__tabContainer}>{tabs}</div>
        <div className={classes.tabs__sortContainer}>{sortComponent}</div>
      </div>
      <div className={classes.tabs__itemContent}>{content}</div>
    </div>
  );
};
