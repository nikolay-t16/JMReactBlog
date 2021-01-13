import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Alert, Spin } from 'antd';
import styles from './SignUpPage.module.scss';

import FormSignUp, { FormSignUpData } from '../../layouts/Form/FormSignUp/FormSignUp';
import ProductionReady, { RegisterUserData } from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';
import * as actions from '../../../store/actions';
import { UserData } from '../../../store/reducer';
import ValidationError, { ValidationErrorsData } from '../../../helpers/ValidationError';

type SignUpPageProps = {
  registerUser: (regUser: RegisterUserData) => Promise<UserData>;
  setUser: (params: { user: UserData | null }) => void;
};

const SignUpPage = ({ setUser, registerUser }: SignUpPageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [validationError, setValidationError] = useState<ValidationErrorsData>({});
  const [fetchingError, setFetchingError] = useState<string>('');

  const onSubmit = ({ username, email, password }: FormSignUpData) => {
    setValidationError({});
    setFetchingError('');
    setIsFetching(true);

    registerUser({ username, email, password })
      .then((user) => {
        setUser({ user });
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

export default connect(null, (dispatch) => {
  const { setUser } = bindActionCreators(actions, dispatch);
  return { setUser };
})(SignUpPageWithApi);
