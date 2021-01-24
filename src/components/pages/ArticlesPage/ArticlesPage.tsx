import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Spin } from 'antd';

import styles from './ArticlesPage.module.scss';
import WithApi from '../../helpers/WithApi';
import { ArticleData, StateData, UserData } from '../../../redux/reducer';
import * as actions from '../../../redux/actions';
import ProductionReady from '../../../helpers/ProductionReady';
import settings from '../../../settings.json';
import ArticleList from '../../layouts/ArticleList/ArticleList';

type ArticlesPageProps = {
  page: number;
  user: UserData | null;
  setArticles: (payload: { articles: ArticleData[]; articlesCount: number }) => void;
  fetchArticles: (
    page: number,
    perPage: number,
    token: string,
  ) => Promise<{ articles: ArticleData[]; articlesCount: number }>;
};

const ArticlesPage = ({ page, user, setArticles, fetchArticles }: ArticlesPageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState('');
  const loadPage = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await fetchArticles(page, settings.articlesPerPage, user?.token || '');
      setArticles({ ...response });
      setFetchingError('');
    } catch (error) {
      setFetchingError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, [fetchArticles, page, setArticles, user]);

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
  ({ page, user }: StateData) => ({ page, user }),
  (dispatch) => {
    const { setArticles } = bindActionCreators(actions, dispatch);
    return { setArticles };
  },
)(ArticlesPageWithApi);
