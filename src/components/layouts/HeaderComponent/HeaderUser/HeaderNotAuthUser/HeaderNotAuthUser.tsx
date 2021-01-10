import React from 'react';
import { Link } from 'react-router-dom';

import styles from './HeaderNotAuthUser.module.scss';

const HeaderNotAuthUser = () => (
  <div>
    <Link to="/sign-in" className={styles.signIn}>
      Sign In
    </Link>
    <Link to="/sign-up" className={styles.signUp}>
      Sign Up
    </Link>
  </div>
);

export default HeaderNotAuthUser;
