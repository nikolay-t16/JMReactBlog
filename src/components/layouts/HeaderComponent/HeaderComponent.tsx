import React from 'react';

import styles from './HeaderComponent.module.scss';

import HeaderUser from './HeaderUser/HeaderUser';

const HeaderComponent = () => (
  <div className={styles.root}>
    <h1 className={styles.tittle}>Realworld Blog</h1>
    <HeaderUser />
  </div>
);

export default HeaderComponent;
