import React from 'react';
import { useAppSelector } from '../../store';
import { useMapContext } from '../map/context';

const MapEventListener = () => {
  const context = useMapContext();

  const overlays = useAppSelector((state) => state.map.overlays);
  const appDrawerOpen = useAppSelector((state) => state.scaffold.appDrawerOpen);

  React.useEffect(() => {
    const { map, layers } = context;
    const isLeafletMapReady = map.getZoom() !== undefined;

    if (isLeafletMapReady) {
      Object.values(overlays).forEach((overlay) => {
        const layer = layers[overlay.key];
        if (overlay.visible) {
          map.addLayer(layer);
        } else {
          map.removeLayer(layer);
        }
      });
    }
  }, [overlays]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const { map } = context;
    const isLeafletMapReady = map.getZoom() !== undefined;

    if (isLeafletMapReady) {
      setTimeout(() => map.invalidateSize(), 250);
    }
  }, [appDrawerOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default MapEventListener;
