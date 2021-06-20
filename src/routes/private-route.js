import { useAuthenticationStore } from '../store/auth';
import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

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
          <Component {...props}></Component>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }}></Redirect>
        )
      }
    />
  );
};

export default PrivateRoute;
