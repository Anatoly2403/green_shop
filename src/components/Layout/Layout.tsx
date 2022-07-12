import React, { FC } from "react";
import { Header } from "../Header";
import { Modal } from "../../features/modal/components/Modal";
import classes from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <>
      <div className={classes.layout}>
        <Header />
        <Outlet />
      </div>
      <Modal />
    </>
  );
};
