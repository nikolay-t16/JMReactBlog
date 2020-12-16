import React from 'react';

import styles from './HeaderComponent.module.scss';

import HeaderUser from '../HeaderUser/HeaderUser';

const HeaderComponent = () => (
  <div className={styles.headerComponent}>
    <h6 className={styles.headerComponent__tittle}>Realworld Blog</h6>
    <HeaderUser />
  </div>
);

export default HeaderComponent;
