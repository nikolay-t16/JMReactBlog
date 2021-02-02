import React, { useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './EditArticlePage.module.scss';
import { ArticleData, StateData, UserData } from '../../../redux/d';
import ProductionReady from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';
import * as actions from '../../../redux/actions';
import FormEditArticle from '../../layouts/Form/FormEditArticle/FormEditArticle';

type EditArticlePageProps = {
  fetchArticle: (slug: string) => Promise<ArticleData>;
  user: UserData | null;
  slug: string;
  setArticle: (payload: { article: ArticleData }) => void;
};

const EditArticlePage = ({ fetchArticle, user: authUser, slug, setArticle }: EditArticlePageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const history = useHistory();
  if (authUser === null) {
    history.push('/sign-in');
  }

  const loadPage = useCallback(async () => {
    try {
      setIsFetching(true);
      const fetchingArticle = await fetchArticle(slug);
      setArticle({ article: fetchingArticle });
      setFetchingError('');
    } catch (error) {
      setFetchingError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, [fetchArticle, setArticle, slug]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  if (isFetching) {
    return <div className={styles.root}>{isFetching && <Spin className={styles.spin} size="large" />}</div>;
  }

  return (
    <div className={styles.root}>
      {fetchingError && (
        <div className={styles.alerts}>
          <Alert message={fetchingError} type="error" closable />
        </div>
      )}
      <FormEditArticle />
    </div>
  );
};

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  fetchArticle: productionReady.fetchArticle.bind(productionReady),
});

const EditArticlePageWithApi = WithApi(mapMethodsToProps)(EditArticlePage);

export default connect(
  ({ user }: StateData) => ({ user }),
  (dispatch) => {
    const { setArticle } = bindActionCreators(actions, dispatch);
    return { setArticle };
  },
)(EditArticlePageWithApi);
