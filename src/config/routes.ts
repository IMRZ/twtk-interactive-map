import type { RouteConfig } from 'react-router-config';

import Home from '../components/views/Home';
import Maps from '../components/views/Maps';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: `/maps/:mode`,
    component: Maps,
    exact: true,
  }
];

export default routes;
