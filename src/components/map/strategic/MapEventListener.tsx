import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { useMapContext } from '../context';
import { zoomChanged } from '../reducer';
import { regions } from '../../../data/common';

const MapEventListener = () => {
  const context = useMapContext();

  const dispatch = useAppDispatch();
  const resetZoom = () => dispatch(zoomChanged('mid'));

  const overlays = useAppSelector((state) => state.map.overlays);
  const selectedRegion = useAppSelector((state) => state.strategic.selectedRegion);
  const drawerOpen = useAppSelector((state) => state.scaffold.drawerOpen);

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
    const { map, bounds } = context;
    const isLeafletMapReady = map.getZoom() !== undefined;

    if (isLeafletMapReady) {
      if (selectedRegion) {
        const region = regions[selectedRegion];
        map.flyTo([region.settlement.y, region.settlement.x], 1);
      } else {
        resetZoom(); // fade-out labels if zoom === 'low'
        map.flyToBounds(bounds);
      }
    }
  }, [selectedRegion]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const { map } = context;
    const isLeafletMapReady = map.getZoom() !== undefined;

    if (isLeafletMapReady) {
      setTimeout(() => map.invalidateSize(), 250);
    }
  }, [drawerOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default MapEventListener;
