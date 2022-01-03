import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
