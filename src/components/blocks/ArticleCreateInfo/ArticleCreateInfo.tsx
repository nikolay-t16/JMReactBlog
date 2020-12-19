import React from 'react';

import styles from './ArticleCreateInfo.module.scss';
import userIcon from '../../../assets/images/user_default.png';

const ArticleCreateInfo = () => (
  <div className={styles.root}>
    <img src={userIcon} alt="user icon" />
    <div className={styles.content}>
      <div className={styles.contentName}>John Doe</div>
      <div className={styles.contentDate}>March 5, 2020</div>
    </div>
  </div>
);

export default ArticleCreateInfo;
