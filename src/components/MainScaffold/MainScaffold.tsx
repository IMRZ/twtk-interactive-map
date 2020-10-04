import React from 'react';
import clsx from 'clsx';
import { makeStyles, AppBar, Toolbar, Hidden, Drawer, Divider } from '@material-ui/core';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
  },
  contentShift: {
    [theme.breakpoints.up('md')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
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

type MainScaffoldProps = {
  drawerOpen: boolean;
  mobileDrawerOpen: boolean;
  toggleDrawer: () => void;
  barContent: React.ReactElement;
  mainContent: React.ReactElement;
  drawerContent: React.ReactElement;
};

const MainScaffold = (props: MainScaffoldProps) => {
  const { drawerOpen, toggleDrawer } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" color="inherit" elevation={0}>
        {props.barContent}
        <Divider />
      </AppBar>
      <main className={clsx(classes.content, { [classes.contentShift]: drawerOpen })}>
        <Toolbar />
        {props.mainContent}
      </main>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={props.mobileDrawerOpen}
            onClose={toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <div className={classes.scroller}>
              {props.drawerContent}
            </div>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            open={drawerOpen}
            variant="persistent"
            anchor="right"
          >
            <Toolbar />
            <div className={classes.scroller}>
              {props.drawerContent}
            </div>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default MainScaffold;
