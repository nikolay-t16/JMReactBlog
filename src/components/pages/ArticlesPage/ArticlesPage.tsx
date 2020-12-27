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
      // eslint-disable-next-line no-console
      console.log(error);
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
      <div className={styles.spinner}>
        <Spin size="large" />
      </div>
    );
  }

  if (fetchingError) {
    return (
      <div>
        <Alert message={fetchingError} type="error" />
      </div>
    );
  }

  return (
    <div>
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
