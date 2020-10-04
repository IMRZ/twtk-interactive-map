import React from 'react';
import {
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@material-ui/core';
import { useTranslation } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../store';
import { overlayChanged } from '../map/reducer';
import assets from '../../assets';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(1),
  },
}));

const MapRegionMarkerFilterSection = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const overlays = useAppSelector((state) => state.map.overlays);

  const dispatch = useAppDispatch();
  const setOverlayVisible = (overlayKey: string, visible: boolean) => {
    dispatch(overlayChanged([overlayKey, visible]));
  };

  return (
    <List
      subheader={<ListSubheader disableSticky>{t('strategic.markerSectionTitle')}</ListSubheader>}
    >
      {Object.values(overlays)
        .sort((a, b) => b.count - a.count)
        .map((overlay) => (
          <ListItem key={overlay.key} dense>
            <img
              className={classes.icon}
              src={assets[`icons/${overlay.key.split('.')[1]}`]}
              alt=""
            />
            <ListItemText primary={t(overlay.key)} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                color="primary"
                onChange={(e, checked) => setOverlayVisible(overlay.key, checked)}
                checked={overlay.visible}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
};

export default MapRegionMarkerFilterSection;
