import React from 'react';

import styles from './SignInPage.module.scss';
import FormSignIn from '../../layouts/Form/FormSignIn/FormSignIn';

const SignInPage = () => (
  <div className={styles.root}>
    <div className={styles.content}>
      <FormSignIn />
    </div>
  </div>
);

export default SignInPage;
