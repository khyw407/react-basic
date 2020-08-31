import React from 'react';
// https://material-ui.com/components/material-icons/
import TimelineIcon from '@material-ui/icons/Timeline';
import PeopleIcon from '@material-ui/icons/People';
import ScheduleIcon from '@material-ui/icons/Schedule';

let HomeContainer = React.lazy(() => import('./components/HomeContainer'));
let LoginContainer = React.lazy(() => import('./components/LoginContainer'));

export default [
    {
        name: '화면1',
        icon: <TimelineIcon />,
        path: '/',
        component: HomeContainer,
        todo: true,
    },
    {
        name: '화면2',
        icon: <ScheduleIcon />,
        path: '/test2',
        component: HomeContainer,
        todo: true,
      },
      {
        name: '화면3',
        icon: <PeopleIcon />,
        path: '/test3',
        component: HomeContainer,
        todo: true,
      },
      {
        name: 'login',
        path: '/login',
        component: LoginContainer,
        hidden: true,
      },
].filter(Boolean);
