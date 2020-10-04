import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Hidden, Drawer, Divider } from '@material-ui/core';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    // backgroundColor: '#303030',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

type MainScaffoldProps = {
  drawerOpen: boolean;
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
      <main className={classes.content}>
        <Toolbar />
        {props.mainContent}
      </main>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {props.drawerContent}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            anchor="right"
            open
          >
            {props.drawerContent}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default MainScaffold;
