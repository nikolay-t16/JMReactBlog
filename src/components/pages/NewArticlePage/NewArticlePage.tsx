import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import { connect } from 'react-redux';
import styles from './NewArticlePage.module.scss';
import FormArticle from '../../layouts/Form/FormArticle/FormArticle';
import { ArticleData, StateData, UserData } from '../../../redux/reducer';
import ProductionReady, { EditArticleData } from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';

type NewArticlePageProps = {
  createArticle: (newArticle: EditArticleData, token: string) => Promise<ArticleData>;
  user: UserData | null;
};

const NewArticlePage = ({ createArticle, user: authUser }: NewArticlePageProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState<string>('');
  const history = useHistory();

  const onSubmit = (formArticleData: EditArticleData) => {
    setFetchingError('');
    setIsFetching(true);

    createArticle(formArticleData, authUser?.token || '')
      .then(async (article: ArticleData) => {
        history.push(`/articles/${article.slug}/edit`);
      })
      .catch((error: Error) => {
        setFetchingError(error.message);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return (
    <div className={styles.root}>
      {isFetching && <Spin className={styles.spin} size="large" />}
      {fetchingError && (
        <div className={styles.alerts}>
          <Alert message={fetchingError} type="error" closable />
        </div>
      )}
      <div className={styles.content}>
        <FormArticle tittle="Create new article" onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  createArticle: productionReady.createArticle.bind(productionReady),
});

const NewArticlePageWithApi = WithApi(mapMethodsToProps)(NewArticlePage);

export default connect(({ user }: StateData) => ({ user }))(NewArticlePageWithApi);
