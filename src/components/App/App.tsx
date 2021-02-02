import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import MainLayout from '../layouts/MainLayout/MainLayout';

import ProductionReady from '../../helpers/ProductionReady';
import { getUserToken } from '../../helpers/storage';
import * as actions from '../../redux/actions';
import { UserData } from '../../redux/d';

import styles from './App.module.scss';
import WithApi from '../helpers/WithApi';

type AppProps = {
  setUser: (params: { user: UserData | null }) => void;
  fetchAuthUser: (token: string) => Promise<UserData>;
};

function App({ setUser, fetchAuthUser }: AppProps) {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const userToken: string | null = getUserToken();
    if (!userToken) {
      setIsFetching(false);
      return;
    }
    setIsFetching(true);

    fetchAuthUser(userToken)
      .then((user) => {
        setUser({ user });
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [fetchAuthUser, setUser]);

  if (isFetching) {
    return (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  fetchAuthUser: productionReady.fetchAuthUser.bind(productionReady),
});

const AppWithApi = WithApi(mapMethodsToProps)(App);

export default connect(null, (dispatch) => {
  const { setUser } = bindActionCreators(actions, dispatch);
  return { setUser };
})(AppWithApi);
