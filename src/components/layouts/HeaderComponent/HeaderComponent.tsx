import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import styles from './HeaderComponent.module.scss';

import HeaderUser from './HeaderUser/HeaderUser';

const HeaderComponent = () => (
  <div className={styles.root}>
    <h1 className={styles.tittle}>
      <Link to="/" className={styles.tittleHref}>
        Realworld Blog
      </Link>
    </h1>
    <HeaderUser />
  </div>
);

export default withRouter(HeaderComponent);
