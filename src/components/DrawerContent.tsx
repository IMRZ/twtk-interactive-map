import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Filters from './control/Filters';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  scroller: {
    height: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      width: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  }
}));

type DrawerContentProps = {
  toggleDrawer: () => void;
};

const DrawerContent = (props: DrawerContentProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.scroller}>
        <Filters />
      </div>
    </div>
  );
};

export default DrawerContent;
