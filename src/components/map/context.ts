import { createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import L from 'leaflet';
import { overlayCreated } from './reducer';

type MapLayerLookup = { [key: string]: L.Layer };

type MapContextState = React.MutableRefObject<{
  map?: L.Map;
  layers: MapLayerLookup;
  waitFor: Promise<void>[];
  bounds: L.LatLngBoundsLiteral;
}>;

export const MapContext = createContext<MapContextState | null>(null);

export function useMapContext() {
  const context = useContext(MapContext);
  const dispatch = useDispatch();

  const state = useMemo(() => {
    return {
      get map(): L.Map {
        return context?.current.map!;
      },
      get layers(): MapLayerLookup {
        return context?.current.layers!;
      },
      get waitFor(): Promise<void>[] {
        return context?.current.waitFor!;
      },
      get bounds(): L.LatLngBoundsLiteral {
        return context?.current.bounds!;
      },
      addOverlay: (key: string, layer: L.Layer, visible = true, count = 1) => {
        context!.current.layers[key] = layer;
        dispatch(overlayCreated([key, visible, count]));
      },
    };
  }, [context, dispatch]);

  return state;
}
