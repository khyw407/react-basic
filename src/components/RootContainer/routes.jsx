import React from 'react';
import {
  Home,
  CalendarViewDay,
} from '@material-ui/icons';

let HomeContainer = React.lazy(() => import('../HomeContainer'));
let Route2 = () => <h1>Route 2</h1>;
let Route3 = () => <h1>Route 3</h1>;

export default [
  {
    id: 'Home',
    icon: <Home />,
    component: HomeContainer,
    href: '/',
  },
  {
    id: 'Group',
    icon: <CalendarViewDay />,
    childIds: [
      'Route 2',
      'Route 3',
    ],
  },
  {
    id: 'Route 2',
    component: Route2,
    href: '/route2',
  },
  {
    id: 'Route 3',
    component: Route3,
    href: '/route3',
  },
];
