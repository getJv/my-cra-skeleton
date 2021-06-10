import { Switch, Route } from 'react-router-dom';
import HomePage from '../src/pages/home';
import UserCreatePage from '../src/pages/home/create';
import UserEditPage from '../src/pages/home/edit';

export default function MainRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/users" component={HomePage} />
      <Route path="/users/create" component={UserCreatePage} />
      <Route path="/users/:id/edit" component={UserEditPage} />
      <Route component={() => <div>404 Page</div>} />
    </Switch>
  );
}
