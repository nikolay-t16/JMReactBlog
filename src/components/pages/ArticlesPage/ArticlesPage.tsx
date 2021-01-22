import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Spin } from 'antd';

import styles from './ArticlesPage.module.scss';
import WithApi from '../../helpers/WithApi';
import { ArticleData, StateData } from '../../../store/reducer';
import * as actions from '../../../store/actions';
import ProductionReady from '../../../helpers/ProductionReady';
import settings from '../../../settings.json';
import ArticleList from '../../layouts/ArticleList/ArticleList';

type ArticlesPageProps = {
  page: number;
  setArticles: (payload: { articles: ArticleData[]; articlesCount: number }) => void;
  fetchArticles: (page: number, perPage: number) => Promise<{ articles: ArticleData[]; articlesCount: number }>;
};

const ArticlesPage = ({ page, setArticles, fetchArticles }: ArticlesPageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState('');
  const loadPage = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await fetchArticles(page, settings.articlesPerPage);
      setArticles({ ...response });
      setFetchingError('');
    } catch (error) {
      setFetchingError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, [fetchArticles, page, setArticles]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  if (isFetching) {
    return (
      <div className={styles.root}>
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (fetchingError) {
    return (
      <div className={styles.root}>
        <Alert message={fetchingError} type="error" closable />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <ArticleList />
    </div>
  );
};
const mapMethodsToProps = (productionReady: ProductionReady) => ({
  fetchArticles: productionReady.fetchArticles.bind(productionReady),
});

const ArticlesPageWithApi = WithApi(mapMethodsToProps)(ArticlesPage);

export default connect(
  ({ page }: StateData) => ({ page }),
  (dispatch) => {
    const { setArticles } = bindActionCreators(actions, dispatch);
    return { setArticles };
  },
)(ArticlesPageWithApi);
