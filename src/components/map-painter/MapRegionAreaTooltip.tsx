import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import GlobalTooltipWrapper from '../GlobalTooltip/GlobalTooltipWrapper';
import assets from '../../assets';

const tooltip_bg = assets['images/tooltip_bg'];

const useStyles = makeStyles(() => ({
  tooltip: {
    maxWidth: 500,
    color: 'white',
    borderImageSlice: '18 18 18 18 fill',
    borderImageWidth: '18px 18px 18px 18px',
    borderImageRepeat: 'repeat',
    borderImageSource: `url("${tooltip_bg}")`,
    padding: 10,
  },
}));

type MapRegionAreaTooltipProps = {
  region: any;
  faction: any;
  children: React.ReactElement;
};

const MapRegionAreaTooltip = (props: MapRegionAreaTooltipProps) => {
  const classes = useStyles();

  const tooltip = (
    <div className={classes.tooltip}>
      <Typography variant="subtitle2">{`${props.region.province.name}, ${props.region.name}`}</Typography>
      <Typography variant="caption">Owner: {props.faction.name}</Typography>
    </div>
  );

  return (
    <GlobalTooltipWrapper tooltip={tooltip}>
      {props.children}
    </GlobalTooltipWrapper>
  )
};

export default MapRegionAreaTooltip;
