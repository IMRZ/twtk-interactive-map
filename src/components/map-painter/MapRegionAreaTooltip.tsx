import React from 'react';
import { makeStyles, Typography, Divider } from '@material-ui/core';
import GlobalTooltipWrapper from '../GlobalTooltip/GlobalTooltipWrapper';
import assets from '../../assets';

const tooltip_bg = assets['images/tooltip_bg'];

const useStyles = makeStyles((theme) => ({
  tooltip: {
    minWidth: 200,
    color: '#ECECEC',
    borderImageSlice: '18 18 18 18 fill',
    borderImageWidth: '18px 18px 18px 18px',
    borderImageRepeat: 'repeat',
    borderImageSource: `url("${tooltip_bg}")`,
    padding: theme.spacing(1, 2),
  },
  regionName: {
    fontWeight: 'bolder',
    fontSize: '1.3em',
  },
  owner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    marginRight: theme.spacing(1),
    height: 48,
    margin: theme.spacing(-1, 0),
  },
  divider: {
    backgroundColor: '#ECECEC',
    margin: theme.spacing(1, 0),
  },
}));

type MapRegionAreaTooltipProps = {
  region: any;
  faction?: any;
  children: React.ReactElement;
};

const MapRegionAreaTooltip = (props: MapRegionAreaTooltipProps) => {
  const classes = useStyles();

  const tooltip = (
    <div className={classes.tooltip}>
      <Typography className={classes.regionName}>{props.region.name}</Typography>
      {props.faction ? (
        <div className={classes.owner}>
          <img className={classes.flag} src={assets[`flags/${props.faction.icon}/mon_64`]} alt="" />
          <Typography variant="overline">{props.faction.name}</Typography>
        </div>
      ): (
        <Typography variant="overline">Abandoned</Typography>
      )}
      <Divider className={classes.divider} />
      <Typography variant="body2">Commandery: {props.region.province.name}</Typography>
    </div>
  );

  return (
    <GlobalTooltipWrapper tooltip={tooltip}>
      {props.children}
    </GlobalTooltipWrapper>
  )
};

export default MapRegionAreaTooltip;
