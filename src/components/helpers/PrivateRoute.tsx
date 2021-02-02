import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateData } from '../../redux/d';

const PrivateRoute = ({ component, ...rest }: any) => {
  const isAuth = useSelector<StateData>((state) => state.user != null);

  const routeComponent = (props: any) =>
    isAuth ? React.createElement(component, props) : <Redirect to={{ pathname: '/sign-in' }} />;
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
