import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateData } from '../../store/reducer';

const PrivateRoute = ({ component, isAuth, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuth ? React.createElement(component, props) : <Redirect to={{ pathname: '/sign-in' }} />;
  return <Route {...rest} render={routeComponent} />;
};

export default connect(({ user }: StateData) => ({ isAuth: user != null }))(PrivateRoute);
