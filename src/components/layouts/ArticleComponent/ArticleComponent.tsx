import React from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';

import styles from './ArticleComponent.module.scss';
import ArticleListItem from '../ArticleList/ArticleListItem/ArticleListItem';
import { ArticleData, StateData } from '../../../redux/d';

import ProductionReady from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';

type ArticleComponentProps = {
  deleteArticle: () => Promise<void>;
  article: ArticleData | null;
};

const ArticleComponent = ({ article, deleteArticle }: ArticleComponentProps) => {
  if (article === null) {
    return <div className={styles.root}>Article not found</div>;
  }
  return (
    <article className={styles.root}>
      <ArticleListItem article={article} deleteArticle={deleteArticle} showUserControls />
      <div className={styles.body}>
        <Markdown source={article.body} />
      </div>
    </article>
  );
};

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  fetchArticle: productionReady.fetchArticle.bind(productionReady),
});

const ArticleComponentWithApi = WithApi(mapMethodsToProps)(ArticleComponent);

export default connect(({ article }: StateData) => ({ article }))(ArticleComponentWithApi);
