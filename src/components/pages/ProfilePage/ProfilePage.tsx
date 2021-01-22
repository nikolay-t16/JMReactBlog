import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Spin } from 'antd';
import styles from './ProfilePage.module.scss';
import FormProfile, { FormProfileData } from '../../layouts/Form/FormProfile/FormProfile';
import ProductionReady, { EditUserData } from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';
import { StateData, UserData } from '../../../store/reducer';
import * as actions from '../../../store/actions';
import ValidationError, { ValidationErrorsData } from '../../../helpers/ValidationError';

type ProfilePageProps = {
  editUser: (editUser: EditUserData, token: string) => Promise<UserData>;
  setUser: (params: { user: UserData | null }) => void;
  user: UserData | null;
};

const ProfilePage = ({ user: authUser, setUser, editUser }: ProfilePageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [validationError, setValidationError] = useState<ValidationErrorsData>({});
  const [fetchingError, setFetchingError] = useState<string>('');

  const onSubmit = ({ username, email, password, image }: FormProfileData) => {
    setValidationError({});
    setFetchingError('');
    setIsFetching(true);
    const editUserData: EditUserData = { username, email, image };
    if (password) {
      editUserData.password = password;
    }
    const token = authUser?.token || '';
    editUser(editUserData, token)
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
        <FormProfile onSubmit={onSubmit} user={authUser} errors={validationError} />
      </div>
    </div>
  );
};

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  editUser: productionReady.editUser.bind(productionReady),
});

const ProfilePageWithApi = WithApi(mapMethodsToProps)(ProfilePage);

export default connect(
  ({ user }: StateData) => ({ user }),
  (dispatch) => {
    const { setUser } = bindActionCreators(actions, dispatch);
    return { setUser };
  },
)(ProfilePageWithApi);
