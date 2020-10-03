import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import L from 'leaflet';
import { MapContext } from './context';
import { zoomChanged } from './reducer';

const style = {
  height: '100%',
  transition: 'opacity 1s',
  opacity: 0,
};

type MapProps = {
  children: React.ReactNode;
  config: {
    width: number;
    height: number;
  }
};

const Map = (props: MapProps) => {
  const { children, config } = props;
  const dispatch = useDispatch();

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

  const [loaded, setLoaded] = React.useState(false);

  const mapContainer = useCallback((el) => {
    if (el !== null) {
      const leafletMap = L.map(el, {
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

      leafletMap.on('zoomend', (e) => {
        if (e.target._zoom === -2) {
          dispatch(zoomChanged('high'));
        } else if (e.target._zoom >= 0) {
          dispatch(zoomChanged('low'));
        } else {
          dispatch(zoomChanged('mid'));
        }
      });

      contextState.current.map = leafletMap;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const map = contextState.current.map!;
    const waitFor = contextState.current.waitFor!;

    map.fitBounds(bounds);

    Promise.all(waitFor).then(() => {
      setLoaded(true);
    });

    return () => {
      map.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ ...style, opacity: loaded ? 1 : 0 }}>
      <div ref={mapContainer} style={{ height: '100%', backgroundColor: 'transparent' }}>
        <MapContext.Provider value={contextState}>{children}</MapContext.Provider>
      </div>
    </div>
  );
};

export default Map;
