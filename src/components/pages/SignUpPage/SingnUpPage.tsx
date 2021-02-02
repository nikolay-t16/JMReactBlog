import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { Alert, Spin } from 'antd';

import styles from './SignUpPage.module.scss';

import FormSignUp, { FormSignUpData } from '../../layouts/Form/FormSignUp/FormSignUp';
import ProductionReady, { RegisterUserData } from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';
import * as actions from '../../../redux/actions';
import { StateData, UserData } from '../../../redux/d';
import ValidationError, { ValidationErrorsData } from '../../../helpers/ValidationError';

type SignUpPageProps = {
  registerUser: (regUser: RegisterUserData) => Promise<UserData>;
  setUser: (params: { user: UserData | null }) => void;
  user: UserData | null;
};

const SignUpPage = ({ setUser, registerUser, user: authUser }: SignUpPageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [validationError, setValidationError] = useState<ValidationErrorsData>({});
  const [fetchingError, setFetchingError] = useState<string>('');
  const history = useHistory();
  if (authUser !== null) {
    history.push('/profile');
  }

  const onSubmit = ({ username, email, password }: FormSignUpData) => {
    setValidationError({});
    setFetchingError('');
    setIsFetching(true);

    registerUser({ username, email, password })
      .then(async (user) => {
        await setUser({ user });
        history.push('/');
      })
      .catch((error: ValidationError | Error) => {
        if (error instanceof ValidationError) {
          setValidationError(error.errors);
        }
        setFetchingError(error.message);
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
        <FormSignUp onSubmit={onSubmit} errors={validationError} />
      </div>
    </div>
  );
};

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  registerUser: productionReady.registerUser.bind(productionReady),
});

const SignUpPageWithApi = WithApi(mapMethodsToProps)(SignUpPage);

export default connect(
  ({ user }: StateData) => ({ user }),
  (dispatch) => {
    const { setUser } = bindActionCreators(actions, dispatch);
    return { setUser };
  },
)(SignUpPageWithApi);
