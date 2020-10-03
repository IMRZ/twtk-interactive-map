import React, { useCallback } from 'react';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FilterCenterFocus } from '@material-ui/icons';
import { useAppDispatch } from '../../../store';
import { useMapContext } from '../context';
import { zoomChanged } from '../reducer';

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

  const dispatch = useAppDispatch();
  const resetZoom = () => dispatch(zoomChanged('mid'));

  const onClick = useCallback(() => {
    const { map, bounds } = context;
    resetZoom();
    map.flyToBounds(bounds);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fab size="medium" color="primary" className={classes.fab} onClick={onClick}>
      <FilterCenterFocus />
    </Fab>
  );
};

export default MapCenterButton;
