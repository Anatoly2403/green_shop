import React, { FC } from "react";
import classes from "./Header.module.scss";
import { ReactComponent as Logo } from "../../assets/icons/Logo.svg";
import { ReactComponent as Logout } from "../../assets/icons/Logout.svg";
import { NavLink } from "react-router-dom";
import CartBtn from "../ui/CartBtn/CartBtn";
import SearchBtn from "../ui/SearchBtn/SearchBtn";
import Button from "../ui/Button/Button";
import { useStore } from "../../store";

const Header: FC = () => {
  const { createModal } = useStore("modalStore");
  const openModal = () => {
    createModal({ component: <div>Привет мир</div> });
  };

  return (
    <div className={classes.header}>
      <div className={classes.header__logo}>
        <Logo />
      </div>
      <nav className={classes.header__paths}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/plant-care">Plant Care</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.header__headerBtnGroup}>
        <SearchBtn />
        <NavLink to="/cart">
          <CartBtn count={7} />
        </NavLink>

        <Button icon={<Logout />} label="Login" onClick={openModal} />
      </div>
    </div>
  );
};

export default Header;
