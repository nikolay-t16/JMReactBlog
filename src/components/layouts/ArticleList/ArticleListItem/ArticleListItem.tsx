import React from 'react';

import classNames from 'classnames';

import styles from './ArticleListItem.module.scss';
import ArticleCreateInfo from '../../../blocks/ArticleCreateInfo/ArticleCreateInfo';

const ArticleListItem = () => (
  <article className={styles.root}>
    <div className={styles.header}>
      <ArticleCreateInfo />
    </div>
    <div className={styles.content}>
      <div className={styles.contentHeader}>
        <h2 className={styles.contentHeaderTittle}>Some article title</h2>
        <button
          className={classNames([styles.contentHeaderLike, styles.contentHeaderLike_state_disabled])}
          type="button"
        >
          12
        </button>
      </div>
      <div className={styles.contentTags}>
        <div className={styles.contentTagsItem}>Tag1</div>
        <div className={styles.contentTagsItem}>SomeTag</div>
      </div>
      <div className={styles.contentText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </div>
    </div>
  </article>
);

export default ArticleListItem;
