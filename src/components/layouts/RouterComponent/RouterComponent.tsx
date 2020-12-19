import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';

const RouterComponent = () => (
  <>
    <Router>
      <Switch>
        <Route path="/" component={ArticleList} exact />
        <Route path="/articles" component={ArticleList} exact />
      </Switch>
    </Router>
  </>
);

export default RouterComponent;
