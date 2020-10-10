import React from 'react';
import { Route } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

import MainScaffold from '../MainScaffold';
import { useMainScaffold } from '../MainScaffold/useMainScaffold';

import MapStrategic from '../map-strategic/MapStrategic';
import BarStrategic from '../map-strategic/BarStrategic';
import MapRegionMarkerFilterSection from '../map-strategic/MapRegionMarkerFilterSection';


import MapStartpos from '../map-startpos/MapStartpos';
import BarStartpos from '../map-startpos/BarStartpos';
import CampaignSelect from '../map-startpos/CampaignSelect';

const routes: RouteConfig[] = [
  {
    path: '/maps/strategic',
    exact: true,
    main: MapStrategic,
    topbar: BarStrategic,
    sidebar: MapRegionMarkerFilterSection
  },
  {
    path: '/maps/startpos',
    exact: true,
    main: MapStartpos,
    topbar: BarStartpos,
    sidebar: CampaignSelect
  }
];

const Maps = () => {
  const { appDrawerOpen, mobileDrawerOpen, toggleDrawer } = useMainScaffold();

  const main = routes.map((route) => (
    <Route
      key={route.path as string}
      path={route.path}
      exact={route.exact}
      component={route.main}
    />
  ));

  const topbar = routes.map((route) => (
    <Route
      key={route.path as string}
      path={route.path}
      exact={route.exact}
      component={route.topbar}
    />
  ));

  const sidebar = routes.map((route) => (
    <Route
      key={route.path as string}
      path={route.path}
      exact={route.exact}
      component={route.sidebar}
    />
  ));

  return (
    <MainScaffold
      drawerOpen={appDrawerOpen}
      mobileDrawerOpen={mobileDrawerOpen}
      toggleDrawer={toggleDrawer}
      barContent={<>{topbar}</>}
      mainContent={<>{main}</>}
      drawerContent={<>{sidebar}</>}
    />
  );
};

export default Maps;
