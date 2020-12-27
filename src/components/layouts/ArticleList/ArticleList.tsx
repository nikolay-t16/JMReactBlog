import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { bindActionCreators } from 'redux';

import styles from './ArticleList.module.scss';
import settings from '../../../settings.json';

import ArticleListItem from './ArticleListItem/ArticleListItem';
import * as actions from '../../../store/actions';
import { ArticleData, StateData } from '../../../store/reducer';

type ArticleListProps = {
  page: number;
  articlesCount: number;
  articles: ArticleData[];
  setPage: (payload: { page: number }) => void;
};

const ArticleList = ({ articles, articlesCount, page, setPage }: ArticleListProps) => {
  if (articles.length === 0) {
    return <div>No results</div>;
  }

  const articlesNode = articles.map((article) => (
    <div key={article.slug} className={styles.item}>
      <ArticleListItem article={article} />
    </div>
  ));
  const totalPages = articlesCount / settings.articlesPerPage + 1;
  const paginationNode = (
    <div className={styles.pagination}>
      <Pagination
        showSizeChanger={false}
        current={page}
        defaultCurrent={page}
        total={articlesCount}
        pageSize={settings.articlesPerPage}
        onChange={(newPage: number) => {
          setPage({ page: newPage });
        }}
        size="small"
      />
    </div>
  );
  return (
    <div>
      {articlesNode}
      {totalPages > 2 ? paginationNode : null}
    </div>
  );
};

export default connect(
  ({ articles, articlesCount, page }: StateData) => ({ articles, articlesCount, page }),
  (dispatch) => {
    const { setPage } = bindActionCreators(actions, dispatch);
    return { setPage };
  },
)(ArticleList);
