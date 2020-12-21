import React, { useCallback } from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import { FilterCenterFocus } from '@material-ui/icons';
import { useMapContext } from '../map/context';
import { useStoreState, useStoreActions } from '../../store';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
}));

const MapCenterButton = () => {
  const classes = useStyles();
  const context = useMapContext();

  const zoom = useStoreState((state) => state.map.zoom);
  const setZoom = useStoreActions((actions) => actions.map.setZoom);

  const onClick = useCallback(() => {
    const { map, bounds } = context;
    map.flyToBounds(bounds);

    if (zoom === 'low') {
      setZoom('mid'); // hide region labels if zoomed in
    }
  }, [zoom, setZoom]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fab size="medium" color="primary" className={classes.fab} onClick={onClick}>
      <FilterCenterFocus />
    </Fab>
  );
};

export default MapCenterButton;
