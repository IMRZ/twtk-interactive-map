import React from 'react';
import { Route } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

import MainScaffold from '../MainScaffold';
import { useMainScaffold } from '../MainScaffold/useMainScaffold';

import TopBar from '../map-base/TopBar';
import MapStrategic from '../map-strategic/MapStrategic';
import MapRegionMarkerFilterSection from '../map-strategic/MapRegionMarkerFilterSection';
import MapStartpos from '../map-startpos/MapStartpos';
import CampaignSelect from '../map-startpos/CampaignSelect';

const routes: RouteConfig[] = [
  {
    path: '/maps/strategic',
    exact: true,
    main: MapStrategic,
    sidebar: MapRegionMarkerFilterSection
  },
  {
    path: '/maps/startpos',
    exact: true,
    main: MapStartpos,
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
      barContent={<TopBar />}
      mainContent={<>{main}</>}
      drawerContent={<>{sidebar}</>}
    />
  );
};

export default Maps;
