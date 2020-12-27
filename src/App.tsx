import React, { useState } from 'react';

import { ApiProvider } from './components/contexts/apiContext';
import MainLayout from './components/layouts/MainLayout/MainLayout';

import ProductionReady from './helpers/ProductionReady';

function App() {
  const [productionReady] = useState(new ProductionReady());
  return (
    <>
      <ApiProvider value={productionReady}>
        <MainLayout />
      </ApiProvider>
    </>
  );
}

export default App;
