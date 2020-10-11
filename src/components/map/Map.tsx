import React, { useCallback } from 'react';
import L from 'leaflet';
import { MapContext } from './context';
import { useStoreActions } from '../../store';

type MapProps = {
  children: React.ReactNode;
  config: {
    width: number;
    height: number;
  }
};

const Map = (props: MapProps) => {
  const { children, config } = props;

  const reset = useStoreActions((actions) => actions.map.reset);
  const setZoom = useStoreActions((actions) => actions.map.setZoom);
  const setLoaded = useStoreActions((actions) => actions.map.setLoaded);

  const bounds = [
    [0, 0],
    [config.height, config.width],
  ] as L.LatLngBoundsLiteral;

  const contextState = React.useRef({
    map: null as any,
    layers: {} as any,
    waitFor: [] as Promise<void>[],
    bounds,
  });

  const [mapLoaded, setMapLoaded] = React.useState(false);

  const mapContainer = useCallback((el) => {
    if (el !== null) {
      const map = L.map(el, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        inertiaMaxSpeed: Infinity,
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
        maxBounds: bounds,
        zoomSnap: 0.25,
        zoomDelta: 0.25,
        zoomAnimation: true,
        markerZoomAnimation: true,
        wheelPxPerZoomLevel: 60,
      });

      map.on('zoomend', (e) => {
        if (e.target._zoom === -2) {
          setZoom('high');
        } else if (e.target._zoom >= 0) {
          setZoom('low');
        } else {
          setZoom('mid');
        }
      });

      contextState.current.map = map;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const map = contextState.current.map!;
    const waitFor = contextState.current.waitFor!;

    map.fitBounds(bounds);

    Promise.all(waitFor).then(() => {
      setLoaded();
      setMapLoaded(true);
    });

    return () => {
      reset();
      map.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const style: any = {
    height: '100%',
    transition: 'opacity 1s',
    opacity: mapLoaded ? 1 : 0,
    pointerEvents: mapLoaded ? 'auto' : 'none',
  };

  return (
    <div style={style}>
      <div ref={mapContainer} style={{ height: '100%', backgroundColor: 'transparent' }}>
        <MapContext.Provider value={contextState}>{children}</MapContext.Provider>
      </div>
    </div>
  );
};

export default Map;
