import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { reactive, toRefs, onMounted, onUnmounted } from '@vue/composition-api';

export function useLeaflet(settings) {
  let map = null;

  const state = reactive({
    zoomLevel: 'high'
  });

  onMounted(() => {
    const bounds = settings.bounds;

    // layers
    const imageLayer = settings.initImageLayer();
    const layers = settings.initLayers();
    const [firstLayer] = Object.values(layers);

    // map
    map = Leaflet.map(settings.refs.map, {
      crs: Leaflet.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      attributionControl: false,
      doubleClickZoom: false,
      maxBounds: bounds,
      layers: [
        imageLayer,
        firstLayer
      ]
    });

    // overlays
    const overlays = settings.initOverlays();
    Object.values(overlays).forEach(overlay => map.addLayer(overlay));

    // control
    if (settings.controlEnabled) {
      Leaflet.control.layers(layers, overlays).addTo(map);
    }

    // listeners
    map.on('zoomend', (e) => {
      if (e.target._zoom < -1) {
        state.zoomLevel = 'high';
      } else if (e.target._zoom > 0) {
        state.zoomLevel = 'low';
      } else {
        state.zoomLevel = 'med';
      }
    });

    // trigger onReady callback
    settings.onReady && settings.onReady();

    map.fitBounds(bounds);
  });

  onUnmounted(() => {
    map.remove();
  });

  const getMap = () => map;

  return {
    getMap,
    ...toRefs(state)
  };
}

export function createImageLayer(imagePath, bounds) {
  return Leaflet.imageOverlay(imagePath, bounds)
}

export function createSvgLayer(target, bounds) {
  return Leaflet.svgOverlay(target, bounds)
}

export function createMarkerLayer(data, elements, getCoords) {
  const markers = [];

  elements.forEach((element, i) => {
    const icon = createMarkerIcon({ element });
    const dataItem = data[i];
    const { y, x } = getCoords(dataItem);
    const latLng = Leaflet.latLng(y, x);
    const marker = Leaflet.marker(latLng, { icon }); // .bindPopup(name);
    markers.push(marker);
  });

  return Leaflet.layerGroup(markers);
}

const VueMarkerIcon = Leaflet.DivIcon.extend({
  options: {
    element: null
  },
  createIcon: function () {
    return this.options.element;
  }
});

function createMarkerIcon(options) {
  return new VueMarkerIcon(options);
}
