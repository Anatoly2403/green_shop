import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout";
import { Home } from "../../pages/Home";
import { ProductCard } from "../../features/products/ProductCard";

const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<ProductCard />} />
            <Route
              path="/*"
              element={
                <div style={{ textAlign: "center" }}>Page not found</div>
              }
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
