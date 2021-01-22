import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';

import styles from './ArticleListItem.module.scss';
import ArticleCreateInfo from '../../../blocks/ArticleCreateInfo/ArticleCreateInfo';
import { ArticleData, StateData, UserData } from '../../../../store/reducer';
import ArticleUserControls from '../../../blocks/ArticleUserControls/ArticleUserControls';

type ArticleListItemProps = {
  user: UserData | null;
  article: ArticleData;
  shouldNotWrapAsArticle?: boolean;
  showUserControls?: boolean;
  deleteArticle?: () => Promise<void>;
};

const ArticleListItem = ({
  showUserControls,
  user,
  deleteArticle,
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
        <div className={styles.headerInfo}>
          <ArticleCreateInfo key={slug} name={username} image={image} date={new Date(createdAt)} />
        </div>
        {showUserControls && user?.username === username && (
          <div className={styles.controls}>
            <ArticleUserControls deleteArticle={deleteArticle} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h2 className={styles.contentHeaderTittle}>
            <Link to={`/articles/${slug}`} className={styles.contentHeaderTittleHref}>
              {title}
            </Link>
          </h2>
          <button
            className={classNames([styles.contentHeaderLike, styles.contentHeaderLike_state_disabled])}
            type="button"
          >
            {favoritesCount > 0 && <span className={styles.contentHeaderLikeCounter}>{favoritesCount}</span>}
          </button>
        </div>
        {tagList.length > 0 && tagsNode}
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
  showUserControls: false,
  deleteArticle: async () => {},
};

export default connect(({ user }: StateData) => ({ user }))(ArticleListItem);
