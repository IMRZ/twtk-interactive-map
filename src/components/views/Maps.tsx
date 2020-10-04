import React from 'react';

import MainScaffold from '../MainScaffold';
import BarContent from '../BarContent';
import DrawerContent from '../DrawerContent';

import MapStrategic from '../map-strategic/MapStrategic';

import { useMainScaffold } from '../MainScaffold/useMainScaffold';

const Maps = () => {
  const { appDrawerOpen, mobileDrawerOpen, toggleDrawer } = useMainScaffold();

  return (
    <MainScaffold
      drawerOpen={appDrawerOpen}
      mobileDrawerOpen={mobileDrawerOpen}
      toggleDrawer={toggleDrawer}
      barContent={<BarContent toggleDrawer={toggleDrawer} />}
      mainContent={<MapStrategic />}
      drawerContent={<DrawerContent toggleDrawer={toggleDrawer} />}
    />
  );
};

export default Maps;
