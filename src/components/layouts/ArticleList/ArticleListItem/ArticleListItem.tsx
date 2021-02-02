import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Popover } from 'antd';
import styles from './ArticleListItem.module.scss';
import ArticleCreateInfo from '../../../blocks/ArticleCreateInfo/ArticleCreateInfo';
import { ArticleData, StateData, UserData } from '../../../../redux/d';
import ArticleUserControls from '../../../blocks/ArticleUserControls/ArticleUserControls';
import * as actions from '../../../../redux/actions';

type ArticleListItemProps = {
  user: UserData | null;
  article: ArticleData;
  inList?: boolean;
  showUserControls?: boolean;
  deleteArticle?: () => Promise<void>;
  makeFavoriteArticle: (payload: { token: string; slug: string; setInList: boolean }) => void;
};

const ArticleListItem = ({
  showUserControls,
  user,
  deleteArticle,
  makeFavoriteArticle,
  article: {
    slug,
    title,
    description,
    favoritesCount,
    createdAt,
    tagList,
    favorited,
    author: { username, image },
  },
  inList,
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
  const isAuth = user !== null;
  const isDisabledLikeButton = !isAuth || favorited;

  const likeButton = (
    <button
      className={classNames(styles.contentHeaderLike, {
        [styles.contentHeaderLikeDisabled]: isDisabledLikeButton,
      })}
      type="button"
      onClick={() => {
        if (isDisabledLikeButton) {
          return;
        }
        makeFavoriteArticle({ token: user?.token || '', slug, setInList: !!inList });
      }}
    >
      {favoritesCount > 0 && <span className={styles.contentHeaderLikeCounter}>{favoritesCount}</span>}
    </button>
  );

  const likeButtonWithPopover = (
    <Popover
      className={styles.likePopover}
      placement="right"
      content="not authorized"
      arrowPointAtCenter
      trigger="click"
    >
      {likeButton}
    </Popover>
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
          {isAuth}
          {isAuth ? likeButton : likeButtonWithPopover}
        </div>
        {tagList.length > 0 && tagsNode}
        <p className={styles.contentText}>{description}</p>
      </div>
    </>
  );
  if (inList) {
    return <article className={styles.root}>{content}</article>;
  }
  return <div className={styles.root}>{content}</div>;
};

ArticleListItem.defaultProps = {
  inList: false,
  showUserControls: false,
  deleteArticle: async () => {},
};

export default connect(
  ({ user }: StateData) => ({ user }),
  (dispatch) => {
    const { makeFavoriteArticle } = bindActionCreators(actions, dispatch);
    return { makeFavoriteArticle };
  },
)(ArticleListItem);
