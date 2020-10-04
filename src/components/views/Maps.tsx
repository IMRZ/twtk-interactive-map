import React, { useState } from 'react';

import MainScaffold from '../MainScaffold';
import BarContent from '../BarContent';
import DrawerContent from '../DrawerContent';

import MapStrategic from '../map/strategic/MapStrategic';

const Maps = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <MainScaffold
      drawerOpen={drawerOpen}
      toggleDrawer={toggleDrawer}
      barContent={<BarContent toggleDrawer={toggleDrawer} />}
      mainContent={<MapStrategic />}
      drawerContent={<DrawerContent toggleDrawer={toggleDrawer} />}
    />
  );
};

export default Maps;
