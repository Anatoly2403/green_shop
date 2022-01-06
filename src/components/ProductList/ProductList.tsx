import React, { FC } from 'react';
import classes from './ProductList.module.scss';

interface Product {
  id: number;
  image?: string;
  name: string;
  price: number;
  salePercent: number;
}

interface ProductListProps {
  products: Product[];
  onClick?: (id: number) => void;
}

export const ProductList: FC<ProductListProps> = ({ products, onClick }) => {
  return (
    <div className={classes.productList}>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
