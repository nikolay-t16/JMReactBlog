import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

import styles from './ArticlePage.module.scss';

import ArticleComponent from '../../layouts/ArticleComponent/ArticleComponent';
import ProductionReady from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';
import { ArticleData, StateData, UserData } from '../../../redux/d';
import * as actions from '../../../redux/actions';

type ArticlePageProps = {
  slug: string;
  user: UserData;
  setArticle: (payload: { article: ArticleData | null }) => void;
  fetchArticle: (slug: string) => Promise<ArticleData>;
  deleteArticle: (token: string, slug: string) => Promise<void>;
};

const ArticlePage = ({ slug, setArticle, fetchArticle, deleteArticle, user }: ArticlePageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState('');
  const [needShowArticle, setNeedShowArticle] = useState(false);
  const loadPage = useCallback(async () => {
    try {
      setIsFetching(true);
      setNeedShowArticle(false);
      const fetchingArticle = await fetchArticle(slug);
      setArticle({ article: fetchingArticle });
      setFetchingError('');
    } catch (error) {
      setFetchingError(error.message);
      setArticle({ article: null });
    } finally {
      setIsFetching(false);
      setNeedShowArticle(true);
    }
  }, [fetchArticle, setArticle, slug]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const history = useHistory();
  const onDeleteArticle = async () => {
    try {
      setIsFetching(true);
      await deleteArticle(user.token, slug);
      setArticle({ article: null });
      setFetchingError('');
      history.push('/');
    } catch (error) {
      setFetchingError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className={styles.root}>
      {isFetching && (
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
      )}

      {fetchingError && (
        <div className={styles.alerts}>
          <Alert message={fetchingError} type="error" closable />
        </div>
      )}
      {needShowArticle && <ArticleComponent deleteArticle={onDeleteArticle} />}
    </div>
  );
};
const mapMethodsToProps = (productionReady: ProductionReady) => ({
  fetchArticle: productionReady.fetchArticle.bind(productionReady),
  deleteArticle: productionReady.deleteArticle.bind(productionReady),
});

const ArticlePageWithApi = WithApi(mapMethodsToProps)(ArticlePage);

export default connect(
  ({ page, user }: StateData) => ({ page, user }),
  (dispatch) => {
    const { setArticle } = bindActionCreators(actions, dispatch);
    return { setArticle };
  },
)(ArticlePageWithApi);
