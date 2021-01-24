import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { ArticleData, StateData, UserData } from '../../../../redux/reducer';
import FormArticle from '../FormArticle/FormArticle';

import styles from './FormEditArticle.module.scss';

import ProductionReady, { EditArticleData } from '../../../../helpers/ProductionReady';
import WithApi from '../../../helpers/WithApi';
import * as actions from '../../../../redux/actions';

type FormEditArticleProps = {
  editArticle: (newArticle: EditArticleData, token: string, slug: string) => Promise<ArticleData>;
  setArticle: (payload: { article: ArticleData }) => void;
  article: ArticleData | null;
  user: UserData | null;
};

const FormEditArticle = ({ article, user, editArticle, setArticle }: FormEditArticleProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState<string>('');

  const onSubmit = (formArticleData: EditArticleData) => {
    setFetchingError('');
    setIsFetching(true);

    editArticle(formArticleData, user?.token || '', article?.slug || '')
      .then(async (newArticle: ArticleData) => {
        setArticle({ article: newArticle });
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
        <FormArticle article={article || null} tittle="Edit article" onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  editArticle: productionReady.editArticle.bind(productionReady),
});

const FormEditArticleWithApi = WithApi(mapMethodsToProps)(FormEditArticle);

export default connect(
  ({ user, article }: StateData) => ({ user, article }),
  (dispatch) => {
    const { setArticle } = bindActionCreators(actions, dispatch);
    return { setArticle };
  },
)(FormEditArticleWithApi);
