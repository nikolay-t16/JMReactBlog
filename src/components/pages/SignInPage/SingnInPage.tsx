import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Spin } from 'antd';
import { useHistory } from 'react-router-dom';

import styles from './SignInPage.module.scss';

import FormSignIn, { FormSignInData } from '../../layouts/Form/FormSignIn/FormSignIn';
import ProductionReady, { LoginUserData } from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';
import * as actions from '../../../redux/actions';
import { StateData, UserData } from '../../../redux/d';
import ValidationError from '../../../helpers/ValidationError';

type SignInPageProps = {
  loginUser: (regUser: LoginUserData) => Promise<UserData>;
  setUser: (params: { user: UserData | null }) => void;
  user: UserData | null;
};

const SignInPage = ({ loginUser, setUser, user: authUser }: SignInPageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState<string>('');
  const history = useHistory();
  if (authUser !== null) {
    history.push('/profile');
  }

  const onSubmit = ({ email, password }: FormSignInData) => {
    setFetchingError('');
    setIsFetching(true);

    loginUser({ email, password })
      .then(async (user) => {
        await setUser({ user });
        history.push('/');
      })
      .catch((error: ValidationError | Error) => {
        if (error instanceof ValidationError) {
          const [key, value] = Object.entries(error.errors)[0];
          const errorMessage = `${key} ${value}`;
          setFetchingError(errorMessage);
        } else {
          setFetchingError(error.message);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  };
  return (
    <div className={styles.root}>
      {isFetching && <Spin className={styles.spin} size="large" />}
      {fetchingError && (
        <div className={styles.alerts}>
          <Alert message={fetchingError} type="error" closable />
        </div>
      )}
      <div className={styles.content}>
        <FormSignIn onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  loginUser: productionReady.loginUser.bind(productionReady),
});

const SignInPageWithApi = WithApi(mapMethodsToProps)(SignInPage);

export default connect(
  ({ user }: StateData) => ({ user }),
  (dispatch) => {
    const { setUser } = bindActionCreators(actions, dispatch);
    return { setUser };
  },
)(SignInPageWithApi);
