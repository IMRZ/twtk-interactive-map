import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import assets from '../../../assets';

const Parallax = require('parallax-js');

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '-2%',
    right: '-2%',
    bottom: '-2%',
    left: '-2%',
    zIndex: -1,
  },
  video: {
    width: '100%',
    opacity: 0,
    transition: 'opacity 2s',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      height: '100%',
    },
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
