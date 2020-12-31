import React from 'react';
import { useTranslation } from '../../i18n';
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
  divider: {
    backgroundColor: '#ECECEC',
    margin: theme.spacing(1, 0),
  },
}));

type MapResourceMarkerTooltipProps = {
  region: any;
  children: React.ReactElement;
};

const MapResourceMarkerTooltip = (props: MapResourceMarkerTooltipProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const tooltip = (
    <div className={classes.tooltip}>
      <Typography className={classes.regionName}>{props.region.name}</Typography>
      <Typography variant="body2">{t(`markers.${props.region.icon}`)}</Typography>
      <Divider className={classes.divider} />
      <Typography variant="body2">{props.region.isCapital ? 'Capital of the commandery' : 'Minor settlement'}</Typography>
      <Typography variant="body2">Commandery: {props.region.province.name}</Typography>
    </div>
  );

  return (
    <GlobalTooltipWrapper tooltip={tooltip}>
      {props.children}
    </GlobalTooltipWrapper>
  )
};

export default MapResourceMarkerTooltip;
