import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Collapse,
  LinearProgress,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
} from '@material-ui/icons';
import clsx from 'clsx';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useIsMobile from './useIsMobile';
import routes from './routes';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Brand = () => (
  <Typography variant="h6">
    CRA
  </Typography>
);

const SidebarItem = props => {
  const {
    id,
    icon,
    href,
    childItems = [],
    isChild,
    location,
    onNavigate = () => 0,
  } = props;
  const checkActive = href => location.pathname === href;
  const isActive = checkActive(href);
  const isGroup = !!childItems.length;
  const someChildIsActive = childItems.some(child => checkActive(child.href));
  const [isExpanded, setIsExpanded] = React.useState(someChildIsActive);
  const handleListItemOnClick = e => {
    if (isGroup) setIsExpanded(isExpanded => !isExpanded);
    else onNavigate();
  };
  const LinkWrapper = ({ children }) => {
    if (isGroup) return children;
    return (
      <Link to={href}>{children}</Link>
    );
  };

  return (
    <React.Fragment>
      <LinkWrapper>
        <ListItem
          button
          onClick={handleListItemOnClick}
          css={clsx(isActive && `
            .MuiListItemIcon-root,
            .MuiListItemText-root .MuiTypography-root {
              color: #2196f3;
              font-weight: bold;
            }
          `)}
        >
          <ListItemIcon>{isChild ? <i /> : icon}</ListItemIcon>
          <ListItemText
            css={clsx(isChild && `
              & .MuiTypography-root {
                font-size: 0.875rem;
                font-weight: 400;
              }
            `)}
          >{id}</ListItemText>
          {isGroup && (
            !isExpanded ? <ExpandMore /> : <ExpandLess />
          )}
        </ListItem>
      </LinkWrapper>
      <Collapse in={isExpanded} timeout="auto">
        {childItems.map(child => {
          return (
            <SidebarItem
              {...props}
              key={child.id}
              id={child.id}
              icon={child.icon}
              href={child.href}
              childItems={[]}
              isChild
            />
          );
        })}
      </Collapse>
    </React.Fragment>
  );
};

let LoadingProgress = () => (
  <div css={`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1400;
    .MuiLinearProgress-root {
      height: 3px;
      background-color: #ffffff4d;
    }
    .MuiLinearProgress-bar {
      background-color: white;
    }
  `}><LinearProgress /></div>
);

const HeaderAndSidebar = ({ children, location }) => {
  const isMobile = useIsMobile();
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);
  const allChildIds = routes.reduce(
    (_allChildIds, route) => _allChildIds.concat(route.childIds || []),
    [],
  );
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen(val => !val);
  return (
    <div css={`
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      display: flex;
      ${clsx(isMobile && `
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
      `)}
    `}>
      <AppBar color="primary" position="fixed" css="z-index: 1300;">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <div css="flex-grow: 1; display: flex;">
            <Brand />
          </div>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={sidebarOpen}
        onClose={closeSidebar}
        css={`
          flex-shrink: 0;
          width: 240px;

          .MuiDrawer-paper {
            width: 240px;
          }

          .MuiListItemIcon-root {
            min-width: 40px;
          }
        `}
      >
        <Toolbar variant="dense">
          <IconButton edge="start" onClick={closeSidebar}>
            <MenuIcon />
          </IconButton>
          <Brand />
        </Toolbar>
        <Divider />
        <List>
          {routes
            // filter parent menus
            .filter(route => !allChildIds.includes(route.id))
            .map(({ id, icon, href, childIds = [] }) => {
              return (
                <SidebarItem
                  key={id}
                  id={id}
                  icon={icon}
                  href={href}
                  childItems={childIds.map(childId => routes.find(route => route.id === childId))}
                  location={location}
                  onNavigate={() => isMobile && closeSidebar()}
                />
              );
            })}
        </List>
      </Drawer>
      <div
        className={clsx(!isMobile && [
          classes.content,
          sidebarOpen && classes.contentShift,
        ])}
        css="flex-grow: 1; display: flex; flex-direction: column;"
      >
        <Toolbar variant="dense" />
        <main css="flex-grow: 1; display: flex; flex-direction: column; overflow: auto;">
          <React.Suspense fallback={<LoadingProgress />}>
            {children}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default withRouter(HeaderAndSidebar);
