import React, { FC, ReactElement } from 'react';
import cn from 'classnames';
import classes from './Button.module.scss';

interface BtnProps {
  label: string;
  onClick?: () => void;
  icon?: ReactElement;
  className?: string;
}

export const Button: FC<BtnProps> = ({
  label,
  onClick,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(classes.button, className)}
      onClick={onClick}
      {...props}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
