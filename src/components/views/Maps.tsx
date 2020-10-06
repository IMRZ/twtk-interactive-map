import React from 'react';

import MainScaffold from '../MainScaffold';
import BarContent from '../map-strategic/BarContent';

import MapStrategic from '../map-strategic/MapStrategic';
import MapRegionMarkerFilterSection from '../map-strategic/MapRegionMarkerFilterSection';
import { useMainScaffold } from '../MainScaffold/useMainScaffold';

import MapStartpos from '../map-startpos/MapStartpos';

const Maps = () => {
  const { appDrawerOpen, mobileDrawerOpen, toggleDrawer } = useMainScaffold();

  return (
    <MainScaffold
      drawerOpen={appDrawerOpen}
      mobileDrawerOpen={mobileDrawerOpen}
      toggleDrawer={toggleDrawer}
      barContent={<BarContent toggleDrawer={toggleDrawer} />} // TODO: fix me?
      mainContent={<MapStartpos />}
      drawerContent={<MapRegionMarkerFilterSection />}
    />
  );
};

export default Maps;
