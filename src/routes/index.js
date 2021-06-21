import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import { useRoutes } from './use-routes';

export default function Routes() {
  const { privateRoutes, publicRoutes } = useRoutes();

  const renderPrivateRoutes = () =>
    privateRoutes().map(pr => (
      <PrivateRoute key={pr.path} exact={pr.exact} path={pr.path} component={pr.component} />
    ));

  const renderPublicRoutes = () =>
    publicRoutes().map(pr => (
      <Route key={pr.path} exact={pr.exact} path={pr.path} component={pr.component} />
    ));

  return (
    <Switch>
      {renderPrivateRoutes()}
      {renderPublicRoutes()}
    </Switch>
  );
}
