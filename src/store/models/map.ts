import { Action, action } from 'easy-peasy';

type MapOverlay = {
  key: string;
  visible: boolean;
  count: number;
};

interface MapModel {
  zoom: string;
  loaded: boolean;
  overlays: Record<any, MapOverlay>;

  createOverlay: Action<MapModel, [string, boolean, number]>;
  setOverlayVisible: Action<MapModel, [string, boolean]>;
  selectOverlay: Action<MapModel, string>;
  setLoaded: Action<MapModel, void>;
  reset: Action<MapModel, void>;
  setZoom: Action<MapModel, string>;
}

const map: MapModel = {
  zoom: 'mid',
  loaded: false,
  overlays: {},

  createOverlay: action((state, payload) => {
    const [key, visible, count = 1] = payload;
    state.overlays[key] = { key, visible, count };
  }),
  setOverlayVisible: action((state, payload) => {
    const [key, visible] = payload;
    state.overlays[key].visible = visible;
  }),
  selectOverlay: action((state, payload) => {
    const key = payload;
    Object.keys(state.overlays).forEach((overlayKey) => {
      state.overlays[overlayKey].visible = key === overlayKey;
    });
  }),
  setLoaded: action((state, payload) => {
    state.loaded = true;
  }),
  reset: action((state, payload) => {
    state.zoom = 'mid';
    state.loaded = false;
    state.overlays = {};
  }),
  setZoom: action((state, payload) => {
    state.zoom = payload;
  }),
};

export default map;
