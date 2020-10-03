import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './config/routes';

const App = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path as string}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
};

export default App;
