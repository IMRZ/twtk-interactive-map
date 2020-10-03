import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import assets from '../assets';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: -1,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  video: {
    width: '100%',
    opacity: 0,
    transition: 'opacity 2s',
  },
  loaded: {
    opacity: 1,
  },
}));

const BackgroundVideo = () => {
  const classes = useStyles();

  const [videoLoaded, setVideoLoaded] = useState(false);
  const onCanPlay = () => setVideoLoaded(true);

  return (
    <div className={classes.root}>
      <video
        className={clsx(classes.video, { [classes.loaded]: videoLoaded })}
        onCanPlay={onCanPlay}
        muted
        loop
        autoPlay
      >
        <source src={assets['videos/mainmenu']} type="video/webm" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
