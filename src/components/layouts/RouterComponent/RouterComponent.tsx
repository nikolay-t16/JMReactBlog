import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ArticlesPage from '../../pages/ArticlesPage/ArticlesPage';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';

const RouterComponent = () => (
  <>
    <Router>
      <Switch>
        <Route path="/" component={ArticlesPage} exact />
        <Route path="/articles" component={ArticlesPage} exact />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <ArticlePage slug={slug} />;
          }}
        />
      </Switch>
    </Router>
  </>
);

export default RouterComponent;
