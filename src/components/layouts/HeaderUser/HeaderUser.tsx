import React from 'react';

import styles from './HeaderUser.module.scss';
import HeaderNotAuthUser from './HeaderNotAuthUser/HeaderNotAuthUser';

const HeaderUser = () => (
  <div className={styles.headerUser}>
    <HeaderNotAuthUser />
  </div>
);

export default HeaderUser;
