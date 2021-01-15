import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApiProvider } from './components/contexts/apiContext';
import MainLayout from './components/layouts/MainLayout/MainLayout';

import ProductionReady from './helpers/ProductionReady';
import { getUserToken } from './helpers/storage';
import * as actions from './store/actions';
import { UserData } from './store/reducer';

type AppProps = {
  setUser: (params: { user: UserData | null }) => void;
};

function App({ setUser }: AppProps) {
  const [productionReady] = useState(new ProductionReady());
  useEffect(() => {
    const userToken: string | null = getUserToken();
    if (!userToken) {
      return;
    }
    productionReady.fetchAuthUser(userToken).then((user) => {
      setUser({ user });
    });
  }, [productionReady, setUser]);
  return (
    <>
      <ApiProvider value={productionReady}>
        <Router>
          <MainLayout />
        </Router>
      </ApiProvider>
    </>
  );
}

export default connect(null, (dispatch) => {
  const { setUser } = bindActionCreators(actions, dispatch);
  return { setUser };
})(App);
