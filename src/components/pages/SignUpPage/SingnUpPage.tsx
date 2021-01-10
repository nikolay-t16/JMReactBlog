import React from 'react';

import styles from './SignUpPage.module.scss';
import FormSignUp from '../../layouts/Form/FormSignUp/FormSignUp';

const SignUpPage = () => (
  <div className={styles.root}>
    <div className={styles.content}>
      <FormSignUp />
    </div>
  </div>
);

export default SignUpPage;
