import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import NotFound from './pages/404';
import UserPage from './pages/users';
import UserCreatePage from './pages/users/create';
import UserEditPage from './pages/users/edit';
import OrganizationPage from '../src/pages/organizations';
import { isAuthenticated } from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props}></Component>
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }}></Redirect>
      )
    }
  />
);

const routeList = [
  {
    exact: true,
    path: '/',
    component: HomePage,
    private: false,
  },
  {
    exact: true,
    path: '/users',
    component: UserPage,
    private: true,
  },
  {
    exact: false,
    path: '/users/create',
    component: UserCreatePage,
    private: true,
  },
  {
    exact: false,
    path: '/users/:id/edit',
    component: UserEditPage,
    private: true,
  },
  {
    exact: true,
    path: '/organizations',
    component: OrganizationPage,
    private: true,
  },
  {
    exact: false,
    path: '',
    component: NotFound,
    private: false,
  },
];

const privateRoutes = () => {
  const routes = routeList.filter(route => route.private);
  const pages = routes.map(pr => (
    <PrivateRoute key={pr.path} exact={pr.exact} path={pr.path} component={pr.component} />
  ));

  return pages;
};
const publicRoutes = () => {
  const routes = routeList.filter(route => !route.private);

  return routes.map(pr => (
    <Route key={pr.path} exact={pr.exact} path={pr.path} component={pr.component} />
  ));
};

export default function MainRoutes() {
  return (
    <Switch>
      {privateRoutes()}
      {publicRoutes()}
    </Switch>
  );
}
