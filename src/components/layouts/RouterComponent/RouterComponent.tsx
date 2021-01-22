import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ArticlesPage from '../../pages/ArticlesPage/ArticlesPage';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';
import SignInPage from '../../pages/SignInPage/SingnInPage';
import SignUpPage from '../../pages/SignUpPage/SingnUpPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import NewArticlePage from '../../pages/NewArticlePage/NewArticlePage';
import EditArticlePage from '../../pages/EditArticlePage/EditArticlePage';
import PrivateRoute from '../../helpers/PrivateRoute';

const RouterComponent = () => (
  <>
    <Switch>
      <Route path="/" component={ArticlesPage} exact />
      <Route path="/articles" component={ArticlesPage} exact />
      <Route
        path="/articles/:slug/edit"
        render={({ match }) => {
          const { slug } = match.params;
          return <EditArticlePage slug={slug} />;
        }}
      />
      <Route
        path="/articles/:slug"
        render={({ match }) => {
          const { slug } = match.params;
          return <ArticlePage slug={slug} />;
        }}
      />
      <Route path="/sign-in" component={SignInPage} exact />
      <Route path="/sign-up" component={SignUpPage} exact />
      <PrivateRoute path="/profile" component={() => <ProfilePage />} exact />
      <PrivateRoute path="/new-article" component={() => <NewArticlePage />} exact />
    </Switch>
  </>
);

export default RouterComponent;
