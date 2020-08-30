import React from 'react';
import { Collapse, ListItem, ListItemIcon, ListItemText, Chip } from '@material-ui/core';
import { Link, generatePath, matchPath, useLocation } from 'react-router-dom';
import { PRIMARY_COLOR, TEXT_PRIMARY_COLOR, BACKGROUND_COLOR } from '../../constants';
import { ReactComponent as CaretDownSvg } from '../../media/caret-down.svg';

let MenuItem = ({ route, isChild }) => {
  let { name, icon, path, routes: childRoutes = [], todo } = route;
  let location = useLocation();
  let isGroup = !!childRoutes?.length;
  let isActive = !!matchPath(location.pathname, { path });
  let [isExpanded, setIsExpanded] = React.useState(isActive);

  return (
    <div css={`
      ${isActive ? `
        background: ${BACKGROUND_COLOR};
      ` : ''}
    `}>
      <ListItem
        button
        component={isGroup ? undefined : Link}
        to={isGroup ? undefined : generatePath(path)}
        onClick={isGroup ? e => setIsExpanded(ex => !ex) : undefined}
        css={`
          && {
            color: rgba(27, 35, 52, 0.8);
            ${isActive ? `
              color: ${PRIMARY_COLOR};
              .MuiTypography-root {
                font-weight: 500;
              }
            ` : ''}
            ${isGroup && isActive ? `
              color: ${PRIMARY_COLOR};
              .MuiTypography-root {
                font-weight: 500;
                color: ${TEXT_PRIMARY_COLOR};
              }
            ` : ''}
          }
        `}
      >
        <ListItemIcon
          css={`
            color: inherit;
            min-width: auto;
            width: 28px;
            display: flex;
            justify-content: center;
            margin-right: 8px;
          `}
        >
          {isChild ? null : icon}
        </ListItemIcon>
        <ListItemText css=".MuiTypography-root { font-size: 16px; }">
          {name}
        </ListItemText>
        {todo && (
          <Chip label='개발중' color='secondary' variant="outlined" size="small" />
        )}
        {isGroup && (
          <CaretDownSvg css={isExpanded ? `transform: rotate(180deg)` : ''} />
        )}
      </ListItem>
      <Collapse in={isExpanded} timeout="auto">
        {childRoutes.map((child, i) => (
          <MenuItem
            route={child}
            isChild
            key={i}
          />
        ))}
      </Collapse>
    </div>
  );
};

export default MenuItem;
