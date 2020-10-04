import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// @ts-ignore
import Parallax from 'parallax-js';
import assets from '../assets';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '-5%',
    right: '-5%',
    bottom: '-5%',
    left: '-5%',
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

  React.useEffect(() => {
    const scene = document.getElementById('bgvid');
    const instance = new Parallax(scene);
    return () => instance.destroy();
  }, []);

  return (
    <div id="bgvid" className={classes.root}>
      <video
        data-depth="0.1"
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
