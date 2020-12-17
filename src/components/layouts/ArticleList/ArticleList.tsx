import React from 'react';

import styles from './ArticleList.module.scss';
import ArticleListItem from './ArticleListItem/ArticleListItem';

const ArticleList = () => (
  <div className={styles.articleList}>
    <div className={styles.articleList__item}>
      <ArticleListItem />
    </div>
  </div>
);

export default ArticleList;
