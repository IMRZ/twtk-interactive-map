import React from 'react';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  ListItemIcon,
} from '@material-ui/core';
import { Layers } from '@material-ui/icons';
import { useTranslation } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../store';
import { overlayChanged } from '../map/reducer';

const MarkerFilters = () => {
  const { t } = useTranslation();

  const overlays = useAppSelector((state) => state.map.overlays);

  const dispatch = useAppDispatch();
  const setOverlayVisible = (overlayKey: string, visible: boolean) => {
    dispatch(overlayChanged([overlayKey, visible]));
  };

  return (
    <List subheader={<ListSubheader disableSticky>{t('controls.markers')}</ListSubheader>}>
      {Object.values(overlays).sort((a, b) => b.count - a.count).map((overlay) => (
        <ListItem key={overlay.key} dense>
          <ListItemIcon>
            <Layers />
          </ListItemIcon>
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

export default MarkerFilters;
