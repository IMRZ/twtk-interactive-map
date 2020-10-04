import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';
import { usePreloader } from './preloader';
import assets from '../../../assets';

type PreloaderProps = {
  children: React.ReactElement;
  assets: string[];
};

const Preloader = (props: PreloaderProps) => {
  const { loaded, progress } = usePreloader(props.assets);

  if (!loaded) {
    return (
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img src={assets['images/icon']} alt="" />
        <Box width={120} margin={3}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Box>
    );
  }

  return <>{props.children}</>;
};

export default Preloader;
