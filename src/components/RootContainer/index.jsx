import React from 'react';
import HeaderAndSidebar from '../HeaderAndSidebar';
import routes from '../../routes';
import { Route, Switch, Redirect } from 'react-router-dom';

const RootContainer = () => {
  let routeMap = (route, index) => {
    let isGroup = !!route.routes?.length;
    let props = {
      key: index,
      path: route.path,
      component: route.component,
      exact: route.exact ?? true,
    };
    if (isGroup) return (
      <Route {...props} exact={false}>
        <Switch>
          {route.routes.map(routeMap)}
          <Redirect to={route.routes[0].path} />
        </Switch>
      </Route>
    );
    return <Route {...props} />;
  };

  return (
    <HeaderAndSidebar>
      <Switch>
        {routes.map(routeMap)}
      </Switch>
    </HeaderAndSidebar>
  );
};

export default RootContainer;
