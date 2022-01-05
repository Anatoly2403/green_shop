import React, { FC } from 'react';
import classes from './ProductList.module.scss';

const products = [
  {
    id: 0,
    name: 'Barberton Daisy',
    price: 119,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'Potter Plants',
    size: 'S',
    image: null,
  },
  {
    id: 1,
    name: 'Angel Wing Begonia',
    price: 169,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'House Plants',
    size: 'M',
    image: null,
  },
  {
    id: 2,
    name: 'African Violet',
    price: 150,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'Seeds',
    size: 'L',
    image: null,
  },
  {
    id: 3,
    name: 'Beach Spider Lily',
    price: 130,
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem cumque perferendis recusandae, necessitatibus quasi suscipit, quia, excepturi aliquam sapiente nulla. Eum, hic sapiente. Sint magni odio labore corrupti adipisci!. ',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sapiente incidunt error odit aliquam perferendis tempora voluptatibus cupiditate ea porro inventore minus odio at distinctio voluptatem architecto consectetur, deserunt illum!',
    categories: 'Potter Plants',
    size: 'XL',
    image: null,
  },
];

export const ProductList: FC = () => {
  return <div className={classes.productList}></div>;
};
