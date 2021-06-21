import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthenticationStore } from '../store/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthenticationStore(store => store.state);
  const { doAuthVerify } = useAuthenticationStore(store => store.actions);

  useEffect(() => {
    doAuthVerify();
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
