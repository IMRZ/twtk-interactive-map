import React from 'react';
import L from 'leaflet';
import { useMapContext } from '../map/context';

type MapImageLayerProps = {
  image: string;
};

const MapImageLayer = (props: MapImageLayerProps) => {
  const context = useMapContext();

  React.useEffect(() => {
    const { map, bounds, waitFor } = context;
    const imageOverlay = L.imageOverlay(props.image, bounds, {});

    const onLoad = new Promise<void>((resolve) => {
      imageOverlay.on('load', () => resolve());
    });
    waitFor.push(onLoad);

    map.addLayer(imageOverlay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default MapImageLayer;
