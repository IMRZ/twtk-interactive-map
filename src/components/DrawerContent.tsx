import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Divider } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import Filters from './control/Filters';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    ...theme.mixins.toolbar,
  },
  fillSpace: {
    flexGrow: 1,
  },
  toggleButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  scroller: {
    height: '100%',
    // overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      width: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  }
}));

type DrawerContentProps = {
  toggleDrawer: () => void;
};

const DrawerContent = (props: DrawerContentProps) => {
  const { toggleDrawer } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.fillSpace}></span>
        <IconButton
          className={classes.toggleButton}
          color="inherit"
          edge="end"
          onClick={toggleDrawer}
        >
          <Close />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.scroller}>
        <Filters />
      </div>
    </div>
  );
};

export default DrawerContent;
