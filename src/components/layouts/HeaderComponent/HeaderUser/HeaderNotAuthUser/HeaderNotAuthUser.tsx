import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import styles from './HeaderNotAuthUser.module.scss';

const HeaderNotAuthUser = () => (
  <div>
    <Button type="text" className={styles.button}>
      Sign In
    </Button>
    <Button className={classNames([styles.button, styles.button_theme_signUp])}>Sign Up</Button>
  </div>
);

export default HeaderNotAuthUser;
