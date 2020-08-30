import React from 'react';
import { List, Drawer, Divider } from '@material-ui/core';
import Brand from './Brand';
import MenuItem from './MenuItem';
import routes from '../../routes';
import { BORDER_COLOR } from '../../constants';

let sidebarWidth = 256;

let Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      css={`
        width: ${sidebarWidth}px;
        & > .MuiPaper-root {
          background: white;
          border-right: 1px solid ${BORDER_COLOR};
          width: ${sidebarWidth}px;
          min-height: 0;
        }
      `}
    >
      <Brand />
      <Divider />
      <nav css={`
        flex: 1;
        overflow: auto;
      `}>
        <List disablePadding>
          {routes.filter(route => !route.hidden).map((route, i) => (
            <MenuItem
              route={route}
              key={i}
            />
          ))}
        </List>
      </nav>
    </Drawer>
  );
};

export default Sidebar;
