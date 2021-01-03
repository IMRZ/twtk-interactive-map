import React from 'react';
import { useMapContext } from '../map/context';
import { useStoreState } from '../../store';

const MapEventListener = () => {
  const context = useMapContext();

  const mapLoaded = useStoreState((state) => state.map.loaded);
  const mapOverlays = useStoreState((state) => state.map.overlays);
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
  }, [mapLoaded, mapOverlays]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const { map } = context;

    if (mapLoaded) {
      setTimeout(() => map.invalidateSize(), 250);
    }
  }, [appDrawerOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default MapEventListener;
