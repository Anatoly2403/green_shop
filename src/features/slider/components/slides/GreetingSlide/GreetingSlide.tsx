import React, { FC } from "react";
import classes from "./GreetingSlide.module.scss";
import { ReactComponent as ImageNotFound } from "../../../../../assets/icons/ImageNotFound.svg";
import { Button } from "../../../../../components/Ui/Button";
import { Slide } from "../../../../../typing";

export const GreetingSlide: FC<Slide> = ({ id, title, text, imgComponent }) => {
  const lastWord = title.split(" ").pop();
  const withoutLastWord = title.replace(String(lastWord), "");
  return (
    <div key={id} className={classes.slide}>
      <div className={classes.slide__textContainer}>
        <h1>Welcome to GreenShop</h1>
        <h2>
          {withoutLastWord}
          <span> {lastWord}</span>
        </h2>
        <p>{text}</p>
        <Button
          className={classes.slide__btn}
          label='SHOP NOW'
          onClick={() => console.log("Click")}
        />
      </div>
      <div className={classes.slide__imgContainer}>
        {imgComponent ? (
          <img src={imgComponent} alt='Slider_image' />
        ) : (
          <ImageNotFound color='#46a3584d' />
        )}
      </div>
    </div>
  );
};
