import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import BackgroundVideo from './BackgroundVideo';
import { useTranslation } from '../../../i18n';
import assets from '../../../assets';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
  },
  nav: {
    width: '20%',
    paddingTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      alignItems: 'center',
    },
  },
  title: {
    borderBottom: 'solid 3px black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    textTransform: 'uppercase',
    fontWeight: 'bolder',
  },
  links: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
  image: {
    width: 192,
  }
}));

const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <BackgroundVideo />
      <div className={classes.nav}>
        <div className={classes.title}>
          <img className={classes.image} src={assets['images/icon']} alt="" />
          <Typography className={classes.subtitle} variant="h5">{t('app.subtitle')}</Typography>
        </div>
        <div className={classes.links}>
          <Button size="large" component={Link} to="/maps/strategic">{t('maps.strategic')}</Button>
          <Button disabled size="large" component={Link} to="/maps/painter">{t('maps.painter')}</Button>
          <Button size="large" component={Link} to="/maps/startpos">{t('maps.startpos')}</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
