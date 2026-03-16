import React from 'react';
import { makeStyles, Typography, Divider } from '@material-ui/core';
import GlobalTooltipWrapper from '../GlobalTooltip/GlobalTooltipWrapper';
import { useTranslation } from '../../i18n';
import assets from '../../assets';

const tooltip_bg = assets['images/tooltip_bg'];

const useStyles = makeStyles((theme) => ({
  tooltip: {
    minWidth: 200,
    color: 'rgba(255, 255, 255, 0.8)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: theme.spacing(1, 0),
  },
}));

type MapRegionOwnerTooltipProps = {
  region: any;
  faction?: any;
  children: React.ReactElement;
};

const MapRegionOwnerTooltip = (props: MapRegionOwnerTooltipProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const icon = assets[`flags/${props.faction?.icon ?? 'abandoned'}/mon_64`];
  const name = props.faction?.name ?? 'Abandoned';

  const tooltip = (
    <div className={classes.tooltip}>
      <Typography className={classes.regionName}>{props.region.name}</Typography>
      <div className={classes.owner}>
        <img className={classes.flag} src={icon} alt="" />
        <Typography variant="overline">{name}</Typography>
      </div>
      <Divider className={classes.divider} />
      <Typography variant="body2">{t(`markers.${props.region.icon}`)}</Typography>
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

export default MapRegionOwnerTooltip;
