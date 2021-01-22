import React from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import styles from './ArticleUserControls.module.scss';
import ProductionReady from '../../../helpers/ProductionReady';
import WithApi from '../../helpers/WithApi';
import { StateData } from '../../../store/reducer';

type ArticleUserControlsProps = {
  slug: string;
  deleteArticle: () => Promise<void>;
};

const ArticleUserControls = ({ slug, deleteArticle }: ArticleUserControlsProps) => (
  <div className={styles.root}>
    <Popconfirm
      placement="topRight"
      title="Do yoy really wont to delete article?"
      onConfirm={deleteArticle}
      okText="Yes"
      cancelText="No"
    >
      <button className={classNames(styles.button, styles.buttonDelete)} type="button">
        Delete
      </button>
    </Popconfirm>

    <Link to={`/articles/${slug}/edit`} className={classNames(styles.button, styles.buttonEdit)} type="button">
      Edit
    </Link>
  </div>
);

const mapMethodsToProps = (productionReady: ProductionReady) => ({
  fetchArticle: productionReady.fetchArticle.bind(productionReady),
});

const ArticleUserControlsWithApi = WithApi(mapMethodsToProps)(ArticleUserControls);

export default connect(({ article }: StateData) => ({ slug: article?.slug || '' }))(ArticleUserControlsWithApi);
