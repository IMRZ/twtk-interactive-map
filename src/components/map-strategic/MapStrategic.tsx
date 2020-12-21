import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Preloader from '../map-base/Preloader';
import Map from '../map/Map';
import MapImageLayer from '../map-base/MapImageLayer';
import MapEventListener from './MapEventListener';
import MapCenterButton from '../map-base/MapCenterButton';
import MapRegionMarkerLayer from './MapRegionMarkerLayer';

import mapConfig from '../../data/config';

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
      <Preloader assets={[mapConfig.image]}>
        <Map config={mapConfig}>
          <MapImageLayer image={mapConfig.image} />
          <MapRegionMarkerLayer />
          <MapCenterButton />
          <MapEventListener />
        </Map>
      </Preloader>
    </div>
  );
};

export default MapStrategic;
