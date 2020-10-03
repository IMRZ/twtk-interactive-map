import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Preloader from '../Preloader';
import Map from '../Map';
import MapImageLayer from '../base/MapImageLayer';
import MapEventListener from './MapEventListener';
import MapCenterButton from '../base/MapCenterButton';
import MapRegionMarkerLayer from './MapRegionMarkerLayer';

import config from '../../../data/config';

const useStyles = makeStyles(() => ({
  map: {
    position: 'relative',
    flex: 1,
  },
}));

const MapStrategic = () => {
  const classes = useStyles();

  return (
    <div className={classes.map}>
      <Preloader assets={[config.map.image]}>
        <Map config={config.map}>
          <MapImageLayer image={config.map.image} />
          <MapRegionMarkerLayer />
          <MapCenterButton />
          <MapEventListener />
        </Map>
      </Preloader>
    </div>
  );
};

export default MapStrategic;
