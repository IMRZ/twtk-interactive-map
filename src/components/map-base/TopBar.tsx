import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Toolbar } from '@material-ui/core';
import { Tune, GitHub } from '@material-ui/icons';
import { useTranslation } from '../../i18n';
import assets from '../../assets';

import GlobalSearch from './GlobalSearch';
import { useMainScaffold } from '../MainScaffold/useMainScaffold';

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

function TopBar() {
  const { toggleDrawer } = useMainScaffold();
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

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
          {t('app.title')}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" noWrap>
          {t('app.subtitle')}
        </Typography>
      </div>
      <GlobalSearch />
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
      <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
        <Tune />
      </IconButton>
    </Toolbar>
  );
}

export default TopBar;
