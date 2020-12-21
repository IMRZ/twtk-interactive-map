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
import assets from '../../assets';
import { useStoreState, useStoreActions } from '../../store';

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

  const overlays = useStoreState((state) => state.map.overlays);
  const setOverlayVisible = useStoreActions((actions) => actions.map.setOverlayVisible);

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
                onChange={(e, checked) => setOverlayVisible([overlay.key, checked])}
                checked={overlay.visible}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
};

export default MapRegionMarkerFilterSection;
