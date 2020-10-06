import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Preloader from '../map-base/Preloader';
import Map from '../map/Map';
import MapImageLayer from '../map-base/MapImageLayer';
import MapCenterButton from '../map-base/MapCenterButton';
import MapStartposMarkerLayer from './MapStartposMarkerLayer';
import MapEventListener from './MapEventListener';

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
          <MapStartposMarkerLayer />
          <MapCenterButton />
          <MapEventListener />
        </Map>
      </Preloader>
    </div>
  );
};

export default MapStrategic;
