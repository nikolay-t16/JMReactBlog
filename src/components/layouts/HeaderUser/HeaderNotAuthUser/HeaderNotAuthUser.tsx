import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import styles from './HeaderNotAuthUser.module.scss';

const HeaderNotAuthUser = () => (
  <div className={styles.headerNotAuthUser}>
    <Button type="text" className={styles.headerNotAuthUser__button}>
      Sign In
    </Button>
    <Button className={classNames([styles.headerNotAuthUser__button, styles.headerNotAuthUser__button_signUp])}>
      Sign Up
    </Button>
  </div>
);

export default HeaderNotAuthUser;
