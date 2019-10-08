import React from 'react';
import HeaderAndSidebar from './HeaderAndSidebar';
import routes from './routes';
import { Route, Switch, Redirect } from 'react-router-dom';

const RootContainer = () => {
  let parentRoutes = routes.filter(route => route.component && !route.childIds);
  return (
    <HeaderAndSidebar>
      <Switch>
        {parentRoutes.map(({ id, icon, href, component, exact }) => (
          <Route
            key={id}
            path={href}
            component={component}
            exact={typeof exact === 'boolean' ? exact : true}
          />
        ))}
        {/*if route doesnt exist then redirect to first route*/}
        <Redirect to={parentRoutes[0].href} />
      </Switch>
    </HeaderAndSidebar>
  );
};

export default RootContainer;
