import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../Layout";
import { HomePage } from "../../pages/HomePage";
import { ProductCard } from "../../features/products/components/ProductCard";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='products/:id' element={<ProductCard />} />
          <Route
            path='*'
            element={<div style={{ textAlign: "center" }}>Page not found</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
