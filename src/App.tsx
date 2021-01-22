import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import { ApiProvider } from './components/contexts/apiContext';
import MainLayout from './components/layouts/MainLayout/MainLayout';

import ProductionReady from './helpers/ProductionReady';
import { getUserToken } from './helpers/storage';
import * as actions from './store/actions';
import { UserData } from './store/reducer';

import styles from './App.module.scss';

type AppProps = {
  setUser: (params: { user: UserData | null }) => void;
};

function App({ setUser }: AppProps) {
  const [productionReady] = useState(new ProductionReady());
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const userToken: string | null = getUserToken();
    if (!userToken) {
      setIsFetching(false);
      return;
    }
    setIsFetching(true);
    productionReady
      .fetchAuthUser(userToken)
      .then((user) => {
        setUser({ user });
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [productionReady, setUser]);

  if (isFetching) {
    return (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    );
  }

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
