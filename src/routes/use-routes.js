import HomePage from '../pages/home';
import UserPage from '../pages/users';
import UserCreatePage from '../pages/users/create';
import UserEditPage from '../pages/users/edit';
import OrganizationPage from '../pages/organizations';
import NotFound from '../pages/404';

export const useRoutes = () => {
  const routes = [
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

  const privateRoutes = () => routes.filter(route => route.private);

  const publicRoutes = () => routes.filter(route => !route.private);

  return { privateRoutes, publicRoutes };
};
