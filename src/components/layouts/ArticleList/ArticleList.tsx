import React from 'react';

import styles from './ArticleList.module.scss';
import ArticleListItem from './ArticleListItem/ArticleListItem';

const ArticleList = () => (
  <div>
    <div className={styles.item}>
      <ArticleListItem />
    </div>
  </div>
);

export default ArticleList;
