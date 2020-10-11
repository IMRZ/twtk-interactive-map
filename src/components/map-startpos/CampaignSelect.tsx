import React from 'react';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Radio,
  ListItemIcon,
} from '@material-ui/core';
import { Layers } from '@material-ui/icons';
import { useTranslation } from '../../i18n';
import { useStoreState, useStoreActions } from '../../store';

import { useLocation } from 'react-router-dom';
import qs from 'qs';

const CampaignSelect = () => {
  const { t } = useTranslation();

  const loaded = useStoreState((state) => state.map.loaded);
  const overlays = useStoreState((state) => state.map.overlays);
  const selectOverlay = useStoreActions((actions) => actions.map.selectOverlay);

  const location = useLocation();

  React.useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (query.campaign) {
      selectOverlay(`markers.${query.campaign}`);
    } else {
      selectOverlay('markers.3k_main_campaign_map');
    }
  }, [loaded, location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <List subheader={<ListSubheader disableSticky>{t('startpos.campaigns')}</ListSubheader>}>
      {Object.values(overlays).map((overlay) => (
        <ListItem key={overlay.key} dense button onClick={() => selectOverlay(overlay.key)}>
          <ListItemIcon>
            <Layers />
          </ListItemIcon>
          <ListItemText primary={t(overlay.key)} />
          <ListItemSecondaryAction>
            <Radio
              color="primary"
              checked={overlay.visible}
              onChange={() => selectOverlay(overlay.key)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default CampaignSelect;
