import React, { FC } from "react";

import { Header } from "../Header";
import { Modal } from "../../features/modal/components/Modal";

import classes from "./Layout.module.scss";

export const Layout: FC = ({ children }) => {
  return (
    <>
      <div className={classes.layout}>
        <Header />
        <div className={classes.layout__container}>{children}</div>
      </div>
      <Modal />
    </>
  );
};
