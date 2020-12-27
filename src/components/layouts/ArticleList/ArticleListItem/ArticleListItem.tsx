import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import styles from './ArticleListItem.module.scss';
import ArticleCreateInfo from '../../../blocks/ArticleCreateInfo/ArticleCreateInfo';
import { ArticleData } from '../../../../store/reducer';

type ArticleListItemProps = {
  article: ArticleData;
  shouldNotWrapAsArticle?: boolean;
};

const ArticleListItem = ({
  article: {
    slug,
    title,
    description,
    favoritesCount,
    createdAt,
    tagList,
    author: { username, image },
  },
  shouldNotWrapAsArticle,
}: ArticleListItemProps) => {
  const tagsNode = (
    <ul className={styles.contentTags}>
      {tagList.map((tag) => (
        <li key={tag} className={styles.contentTagsItem}>
          {tag}
        </li>
      ))}
    </ul>
  );
  const content = (
    <>
      <div className={styles.header}>
        <ArticleCreateInfo key={slug} name={username} image={image} date={new Date(createdAt)} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h2 className={styles.contentHeaderTittle}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </h2>
          <button
            className={classNames([styles.contentHeaderLike, styles.contentHeaderLike_state_disabled])}
            type="button"
          >
            {favoritesCount || null}
          </button>
        </div>
        {tagList.length > 0 ? tagsNode : null}
        <p className={styles.contentText}>{description}</p>
      </div>
    </>
  );
  if (shouldNotWrapAsArticle) {
    return <div className={styles.root}>{content}</div>;
  }

  return <article className={styles.root}>{content}</article>;
};

ArticleListItem.defaultProps = {
  shouldNotWrapAsArticle: true,
};

export default ArticleListItem;
