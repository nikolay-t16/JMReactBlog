import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArticleComponent from '../../layouts/ArticleComponent/ArticleComponent';

import styles from '../ArticlesPage/ArticlesPage.module.scss';
import ProductionReady from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';
import { ArticleData, StateData } from '../../../store/reducer';
import * as actions from '../../../store/actions';

type ArticlePageProps = {
  slug: string;
  setArticle: (payload: { article: ArticleData }) => void;
  fetchArticle: (slug: string) => Promise<ArticleData>;
};

const ArticlePage = ({ slug, setArticle, fetchArticle }: ArticlePageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState('');
  const loadPage = useCallback(async () => {
    try {
      setIsFetching(true);
      const article = await fetchArticle(slug);
      setArticle({ article });
      setFetchingError('');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setFetchingError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, [fetchArticle, setArticle, slug]);

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

  return <ArticleComponent />;
};
const mapMethodsToProps = (productionReady: ProductionReady) => ({
  fetchArticle: productionReady.fetchArticle.bind(productionReady),
});

const ArticlePageWithApi = WithApi(mapMethodsToProps)(ArticlePage);

export default connect(
  ({ page }: StateData) => ({ page }),
  (dispatch) => {
    const { setArticle } = bindActionCreators(actions, dispatch);
    return { setArticle };
  },
)(ArticlePageWithApi);
