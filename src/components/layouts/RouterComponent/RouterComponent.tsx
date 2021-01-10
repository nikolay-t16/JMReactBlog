import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArticlesPage from '../../pages/ArticlesPage/ArticlesPage';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';
import SignInPage from '../../pages/SignInPage/SingnInPage';
import SignUpPage from '../../pages/SignUpPage/SingnUpPage';

const RouterComponent = () => (
  <>
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
      <Route path="/sign-in" component={SignInPage} exact />
      <Route path="/sign-up" component={SignUpPage} exact />
    </Switch>
  </>
);

export default RouterComponent;
