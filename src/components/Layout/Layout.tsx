import React, { FC } from 'react';

import MainHeader from '../Header';
import Modal from '../../features/modal/components/Modal';

import classes from './Layout.module.scss';

const Layout: FC = ({ children }) => {
  return (
    <>
      <div className={classes.layout}>
        <MainHeader />
        <div className={classes.layout__container}>{children}</div>
      </div>
      <Modal />
    </>
  );
};

export default Layout;
