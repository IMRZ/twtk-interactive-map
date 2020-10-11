import React, { useCallback } from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import { FilterCenterFocus } from '@material-ui/icons';
import { useMapContext } from '../map/context';

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

  const onClick = useCallback(() => {
    const { map, bounds } = context;
    map.flyToBounds(bounds);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fab size="medium" color="primary" className={classes.fab} onClick={onClick}>
      <FilterCenterFocus />
    </Fab>
  );
};

export default MapCenterButton;
