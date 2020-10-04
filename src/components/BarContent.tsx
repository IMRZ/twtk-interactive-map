import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Toolbar } from '@material-ui/core';
import { Tune, GitHub } from '@material-ui/icons';

import assets from '../assets';

import Search from './search/Search';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 48,
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(2),
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(1),
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  fillSpace: {
    flexGrow: 1,
  },
}));

type BarContentProps = {
  toggleDrawer: () => void;
};

function BarContent(props: BarContentProps) {
  const { toggleDrawer } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <Toolbar>
      <img
        className={classes.icon}
        src={assets['images/icon']}
        alt=""
        onClick={() => history.push('/')}
      />
      <div className={classes.title}>
        <Typography variant="h6" noWrap>
          Total War: THREE KINGDOMS
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" noWrap>
          Interactive Map
        </Typography>
      </div>
      <Search />
      <span className={classes.fillSpace}></span>
      <IconButton
        color="inherit"
        component="a"
        href="https://github.com/IMRZ/twtk-interactive-map"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub />
      </IconButton>
      <IconButton
        color="inherit"
        edge="end"
        onClick={toggleDrawer}
      >
        <Tune />
      </IconButton>
    </Toolbar>
  );
}

export default BarContent;
