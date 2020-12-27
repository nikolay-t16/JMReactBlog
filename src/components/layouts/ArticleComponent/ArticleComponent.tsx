import React from 'react';

import { connect } from 'react-redux';

import styles from './ArticleComponent.module.scss';
import ArticleListItem from '../ArticleList/ArticleListItem/ArticleListItem';
import { ArticleData, StateData } from '../../../store/reducer';

import ProductionReady from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';

type ArticleComponentProps = {
  article: ArticleData | null;
};

const ArticleComponent = ({ article }: ArticleComponentProps) => {
  if (article === null) {
    return <div className={styles.root}>Article not found</div>;
  }

  return (
    <article className={styles.root}>
      <ArticleListItem article={article} shouldNotWrapAsArticle />
      <span className={styles.body}>{article.body}</span>
    </article>
  );
};

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  fetchArticle: productionReady.fetchArticle.bind(productionReady),
});

const ArticleComponentWithApi = WithApi(mapMethodsToProps)(ArticleComponent);

export default connect(({ article }: StateData) => ({ article }))(ArticleComponentWithApi);
