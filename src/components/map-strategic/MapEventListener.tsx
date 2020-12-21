import React from 'react';
import { useMapContext } from '../map/context';
import { regions } from '../../data/common';
import { useStoreState } from '../../store';

import { useLocation } from 'react-router-dom';
import qs from 'qs';

const MapEventListener = () => {
  const context = useMapContext();

  const mapLoaded = useStoreState((state) => state.map.loaded);
  const mapOverlays = useStoreState((state) => state.map.overlays);
  const selectedRegion = useStoreState((state) => state.strategic.region);
  const appDrawerOpen = useStoreState((state) => state.scaffold.appDrawerOpen);

  React.useEffect(() => {
    const { map, layers } = context;

    if (mapLoaded) {
      Object.values(mapOverlays).forEach((overlay) => {
        const layer = layers[overlay.key];
        if (overlay.visible) {
          map.addLayer(layer);
        } else {
          map.removeLayer(layer);
        }
      });
    }
  }, [mapOverlays]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const { map, bounds } = context;

    if (mapLoaded) {
      if (selectedRegion) {
        const region = regions[selectedRegion];
        map.flyTo([region.settlement.y, region.settlement.x], 1);
      } else {
        map.flyToBounds(bounds);
      }
    }
  }, [selectedRegion]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const { map } = context;

    if (mapLoaded) {
      setTimeout(() => map.invalidateSize(), 250);
    }
  }, [appDrawerOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const location = useLocation();

  React.useEffect(() => {
    const { map } = context;

    if (mapLoaded) {
      const query = qs.parse(location.search, { ignoreQueryPrefix: true });
      if (query.x && query.y) {
        const x = Number(query.x);
        const y = Number(query.y)
        map.flyTo([y, x], 1);
      }
    }
  }, [mapLoaded, location]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default MapEventListener;
