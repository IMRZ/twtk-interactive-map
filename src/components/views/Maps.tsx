import React, { useState } from 'react';

import MainScaffold from '../MainScaffold';
import BarContent from '../BarContent';
import DrawerContent from '../DrawerContent';

import MapStrategic from '../map/strategic/MapStrategic';

import { useTheme, useMediaQuery } from '@material-ui/core';
import { useAppDispatch } from '../../store';
import { drawerOpenChanged } from '../MainScaffold/reducer';

const Maps = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      const open = !drawerOpen;
      setDrawerOpen(open);
      dispatch(drawerOpenChanged(open));
    }
  };

  return (
    <MainScaffold
      drawerOpen={drawerOpen}
      mobileDrawerOpen={mobileDrawerOpen}
      toggleDrawer={toggleDrawer}
      barContent={<BarContent toggleDrawer={toggleDrawer} />}
      mainContent={<MapStrategic />}
      drawerContent={<DrawerContent toggleDrawer={toggleDrawer} />}
    />
  );
};

export default Maps;
